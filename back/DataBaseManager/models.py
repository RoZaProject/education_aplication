from sqlalchemy import create_engine, Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from pydantic import BaseModel

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'
    id: int = Column(Integer, primary_key=True)
    firstName: str = Column(String)
    lastName: str = Column(String)
    password: str = Column(String)
    birthday: str = Column(Date)


class Variants(Base):
    __tablename__ = 'variants'
    id: int = Column(Integer, primary_key=True)