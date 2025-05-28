from sqlalchemy import Column, Integer, String, Date, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    nickname = Column(String(50), unique=True, nullable=False)  
    first_name = Column(String(100), nullable=False)           
    last_name = Column(String(100), nullable=False)
    password_hash = Column(String(255), nullable=False)        
    birthday = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)    
    
    variants = relationship("Variants", back_populates="author")
    results = relationship("Results", back_populates="user")

class Variants(Base):
    __tablename__ = 'variants'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(100), default="Мой вариант")
    created_at = Column(DateTime, default=datetime.utcnow)
    author_id = Column(Integer, ForeignKey('users.id'))
    
    author = relationship("Users", back_populates="variants")
    tasks = relationship("Tasks", back_populates="variant")
    results = relationship("Results", back_populates="variant")

class Tasks(Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)                  
    answer = Column(String)                                   
    points = Column(Integer, default=1)                      
    variant_id = Column(Integer, ForeignKey('variants.id'))   
    
    variant = relationship("Variants", back_populates="tasks")

class Results(Base):
    __tablename__ = 'results'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))          
    variant_id = Column(Integer, ForeignKey('variants.id'))   
    score = Column(Integer)                                   
    answers = Column(JSON)                                    
    completed_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("Users", back_populates="results")
    variant = relationship("Variants", back_populates="results")