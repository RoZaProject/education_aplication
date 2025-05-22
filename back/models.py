from pydantic import BaseModel
from datetime import date


class UserAuth(BaseModel):
    nickname: str
    firstName: str
    lastName: str
    password: str
    birthday: date


class UserLogin(BaseModel):
    login: str
    password: str
    