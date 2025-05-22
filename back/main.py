from uuid import UUID
from fastapi.middleware.cors import CORSMiddleware
import sqlalchemy
import uvicorn
from fastapi import FastAPI, Depends, Response
from fastapi.responses import JSONResponse

from DataBaseManager import db
from DataBaseManager.models import Users, Variants
from authentication import SessionData, get_session_data, create_session_user, backend, cookie
from models import UserAuth, UserLogin

app = FastAPI()


@app.post("/register", response_class=JSONResponse)
async def registerUser(item: UserAuth):
    if db.select(sqlalchemy.select(Users).where(Users.firstName == item.firstName, Users.lastName == item.lastName)):
        return JSONResponse(content={"result": False, "msg": "A user with this login already exists"}, status_code=200)
    elif not item.firstName or not item.lastName or not item.birthday or not item.password:
        return JSONResponse(content={"result": False, "msg": "All fields must be filled in"}, status_code=200)
    response = JSONResponse(content={"result": True, "msg": "ok"}, status_code=200)
    db.execute_commit(sqlalchemy.insert(Users).values(firstName=item.firstName, lastName=item.lastName, birthday=item.birthday, password=item.password))
    user = db.select(sqlalchemy.select(Users).where(Users.firstName == item.firstName, Users.lastName == item.lastName), db.any_)
    await create_session_user(response, id=user.id, firstName=item.firstName, lastName=item.lastName)
    return response


@app.post("/login", response_class=JSONResponse)
async def authenticate(item: UserLogin):
    if not item.login or not item.password:
        return JSONResponse(content={"result": False, "msg": "Login and password fields cannot be empty"},
                            status_code=200)
    user = db.select(
        sqlalchemy.select(Users).where(sqlalchemy.and_(Users.login == item.login, Users.password == item.password)),
        db.any_)
    if not user:
        return JSONResponse(content={"result": False, "msg": "The login or password entered is incorrect"},
                            status_code=200)
    else:
        response = JSONResponse(content={"result": True, "msg": "ok"}, status_code=200)
        await create_session_user(response, id=user.id, login=item.login)
    return response

@app.post("/logout")
async def del_session(response: Response, session_id: UUID = Depends(cookie)):
    await backend.delete(session_id)
    cookie.delete_from_response(response)
    return "ok"


@app.get("/", response_class=JSONResponse)
async def index(session_data: SessionData = Depends(get_session_data)):
    # навешивание этих аргументов уже значит проверку
    return session_data.dict()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)