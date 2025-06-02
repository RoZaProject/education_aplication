from random import sample

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

from sqlalchemy import func, select

from utils.gpt_service import GPTService
from models import UserAuth, Token
import sqlalchemy
from DataBaseManager import db
from DataBaseManager.models import User, Task, Variant, VariantTask, Result
import os
import uvicorn

from shems import SubmitAnswers

from fastapi.middleware.cors import CORSMiddleware

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        nickname: str = payload.get("sub")
        if nickname is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user, = db.select(sqlalchemy.select(User).where(User.nickname == nickname), db.any_)
    if user is None:
        raise credentials_exception
    print(user)
    return user


@app.on_event("startup")
async def startup():
    db.init_db()


@app.post("/register", response_model=Token)
async def register(user: UserAuth):
    if db.select(sqlalchemy.select(User).where(User.nickname == user.nickname), db.any_):
        raise HTTPException(status_code=400, detail="Nickname already registered")

    hashed_password = get_password_hash(user.password)

    db.execute_commit(
        sqlalchemy.insert(User).values(
            nickname=user.nickname,
            first_name=user.first_name,
            last_name=user.last_name,
            birthday=user.birthday,
            password_hash=hashed_password
        )
    )

    access_token = create_access_token(data={"sub": user.nickname})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    with db.get_session() as session:
        user = session.query(User).filter(User.nickname == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect nickname or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.nickname})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return {
        "nickname": current_user.nickname,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name
    }


@app.get("/variants/{variant_id}")
async def get_variant_by_id(variant_id: int, current_user: User = Depends(get_current_user)):
    session = db.get_session()
    try:
        variant = session.execute(select(Variant).where(Variant.id == variant_id)).scalar_one_or_none()
        if not variant:
            raise HTTPException(status_code=404, detail="Вариант не найден")

        # Получаем связанные задачи через таблицу variant_tasks
        variant_tasks = session.execute(
            select(VariantTask).where(VariantTask.variant_id == variant.id)
        ).scalars().all()

        # Получаем задачи из variant_tasks
        task_ids = [vt.task_id for vt in variant_tasks]

        tasks = session.execute(
            select(Task).where(Task.id.in_(task_ids))
        ).scalars().all()

        return {
            "variant_id": variant.id,
            "user_id": variant.user_id,
            "created_at": variant.created_at,
            "tasks": [
                {
                    "id": task.id,
                    "content": task.content,
                    "topic_id": task.topic_id,
                    "difficulty": task.difficulty,
                    "points": task.points
                } for task in tasks
            ]
        }
    finally:
        session.close()


@app.get("/tasks/{task_id}")
async def get_task_by_id(task_id: int, current_user: User = Depends(get_current_user)):
    session = db.get_session()
    try:
        task = session.execute(select(Task).where(Task.id == task_id)).scalar_one_or_none()
        if not task:
            raise HTTPException(status_code=404, detail="Задача не найдена")
        return {
            "id": task.id,
            "content": task.content,
            "topic_id": task.topic_id,
            "difficulty": task.difficulty,
            "points": task.points
        }
    finally:
        session.close()


@app.get("/users/get_var")
async def generate_var(current_user: User = Depends(get_current_user)):
    session = db.get_session()

    # 1. Получаем все уникальные topic_id из задач
    topics_result = session.execute(sqlalchemy.select(Task.topic_id).distinct())
    topic_ids = [row[0] for row in topics_result if row[0] is not None]
    n = 3
    if len(topic_ids) < n:
        raise HTTPException(status_code=400, detail="Недостаточно разных тем в задачах")

    selected_topic_ids = sample(topic_ids, k=n)

    # 2. Получаем по одной случайной задаче для каждой темы
    selected_tasks = []
    for topic_id in selected_topic_ids:
        task = session.execute(
            sqlalchemy.select(Task)
            .where(Task.topic_id == topic_id)
            .order_by(func.random())
            .limit(1)
        ).scalar_one_or_none()

        if task:
            selected_tasks.append(task)

    if len(selected_tasks) < n:
        raise HTTPException(status_code=400, detail="Не удалось подобрать задачи для всех тем")

    # 3. Создаём вариант
    new_variant = Variant(user_id=current_user.id)
    session.add(new_variant)
    session.flush()  # Получаем id нового варианта

    # 4. Добавляем задачи к варианту
    for task in selected_tasks:
        variant_task = VariantTask(variant_id=new_variant.id, task_id=task.id)
        session.add(variant_task)

    session.commit()
    # Внутри блока сессии и до session.close()
    variant_id = new_variant.id
    task_ids = [task.id for task in selected_tasks]

    # После этого можно закрыть сессию
    session.close()

    # И вернуть простые данные
    return {
        "variant_id": variant_id,
        "task_ids": task_ids
    }


# Пример тела
# {
#   "result": [
#     {
#       "id_task": 1,
#       "solution" : "kk"
#     }
#   ]
# }
@app.post("/results/{variant_id}/submit")
async def submit_solution(
        variant_id: int,
        body: SubmitAnswers,
        current_user: User = Depends(get_current_user)
):
    session = db.get_session()
    try:
        result = Result(
            variant_id=variant_id,
            user_id=current_user.id,
            answers=[a.model_dump() for a in body.result],
            score=None
        )
        session.add(result)

        session.commit()

        return {"message": "Solutions submitted successfully"}

    finally:
        session.close()


@app.get("/results/{variant_id}/ai_review/generate")
async def generate_ai_review(
        variant_id: int,
        current_user: User = Depends(get_current_user)
):
    session = db.get_session()
    try:
        result = session.execute(
            sqlalchemy.select(Result)
            .where(Result.variant_id == variant_id)
            .where(Result.user_id == current_user.id)
        ).scalar_one_or_none()

        if result is None:
            raise HTTPException(status_code=404, detail="Result not found")

        variant = session.execute(select(Variant).where(Variant.id == variant_id)).scalar_one_or_none()
        if not variant:
            raise HTTPException(status_code=404, detail="Вариант не найден")

        # Получаем связанные задачи через таблицу variant_tasks
        variant_tasks = session.execute(
            select(VariantTask).where(VariantTask.variant_id == variant.id)
        ).scalars().all()

        # Получаем задачи из variant_tasks
        task_ids = [vt.task_id for vt in variant_tasks]

        tasks = session.execute(
            select(Task).where(Task.id.in_(task_ids))
        ).scalars().all()
        print(tasks)

        ai_review_text = GPTService().generate_report(tasks, result.answers)
        print(ai_review_text)
        # Сохраняем в ai_review
        result.ai_review = '; '.join(map(lambda x: x.text, ai_review_text))

        session.commit()

        return ai_review_text

    finally:
        session.close()


@app.get("/users/askgpt/{task_id}")
async def read_users_askgpt(
        task_id: int,
        ask: str,
        current_user: User = Depends(get_current_user)
):
    # Получаем задачу
    task, = db.select(sqlalchemy.select(Task).where(Task.id == task_id), db.any_)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    # Создаём сервис и отправляем запрос
    service = GPTService()
    response = service.ask(task.content, ask)

    return {"response": response}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
