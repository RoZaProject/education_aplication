from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship, DeclarativeBase
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime

class Base(DeclarativeBase):
    def __repr__(self):
        fields = ', '.join(f"{k}={getattr(self, k)!r}" for k in self.__mapper__.columns.keys())
        return f"{self.__class__.__name__}({fields})"

    def __str__(self):
        return self.__repr__()

class Topic(Base):
    __tablename__ = 'topics'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)

    tasks = relationship("Task", back_populates="topic")


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    nickname = Column(String(50), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    birthday = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)

    variants = relationship("Variant", back_populates="user")
    results = relationship("Result", back_populates="user")


class Variant(Base):
    __tablename__ = 'variants'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="variants")
    results = relationship("Result", back_populates="variant")
    variant_tasks = relationship("VariantTask", back_populates="variant")


class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)
    topic_id = Column(Integer, ForeignKey('topics.id'))
    difficulty = Column(Integer, default=1)
    points = Column(Integer, default=1)
    #
    topic = relationship("Topic", back_populates="tasks")
    variant_tasks = relationship("VariantTask", back_populates="task")


class VariantTask(Base):
    __tablename__ = 'variant_tasks'

    variant_id = Column(Integer, ForeignKey('variants.id'), primary_key=True)
    task_id = Column(Integer, ForeignKey('tasks.id'), primary_key=True)

    variant = relationship("Variant", back_populates="variant_tasks")
    task = relationship("Task", back_populates="variant_tasks")


class Result(Base):
    __tablename__ = 'results'

    id = Column(Integer, primary_key=True)
    variant_id = Column(Integer, ForeignKey('variants.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    score = Column(Integer)
    answers = Column(JSONB)
    ai_review = Column(Text)
    completed_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="results")
    variant = relationship("Variant", back_populates="results")
