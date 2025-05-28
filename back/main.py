from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from models import UserAuth, UserLogin, Token
import sqlalchemy
from DataBaseManager import db
from DataBaseManager.models import Users
import os
import uvicorn

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
    
    user = db.select(sqlalchemy.select(Users).where(Users.nickname == nickname), db.any_)
    if user is None:
        raise credentials_exception
    return user

@app.on_event("startup")
async def startup():
    db.init_db()

@app.post("/register", response_model=Token)
async def register(user: UserAuth):
    if db.select(sqlalchemy.select(Users).where(Users.nickname == user.nickname), db.any_):
        raise HTTPException(status_code=400, detail="Nickname already registered")
    
    hashed_password = get_password_hash(user.password)
    
    db.execute_commit(
        sqlalchemy.insert(Users).values(
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
        user = session.query(Users).filter(Users.nickname == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect nickname or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.nickname})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me")
async def read_users_me(current_user: Users = Depends(get_current_user)):
    return {
        "nickname": current_user.nickname,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)