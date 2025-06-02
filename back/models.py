from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Optional

class UserAuth(BaseModel):
    nickname: str = Field(min_length=3, max_length=50)
    first_name: str = Field(min_length=2, max_length=100)
    last_name: str = Field(min_length=2, max_length=100)
    password: str = Field(min_length=8)
    birthday: date

class UserLogin(BaseModel):
    nickname: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"