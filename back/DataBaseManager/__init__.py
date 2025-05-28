from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base
from utils.variable_environment import VarEnv
from .models import Base

class DataBaseManager:
    all_ = 0
    any_ = 1
    
    def __init__(self, db_url=None):
        self.db_url = db_url or f'postgresql+psycopg2://{VarEnv.DBUSER}:{VarEnv.DBPASSWORD}@{VarEnv.DBHOST}/{VarEnv.DBNAME}'
        self.engine = create_engine(self.db_url, echo=True)
        self.Session = scoped_session(sessionmaker(bind=self.engine))
        
    def init_db(self):
        Base.metadata.create_all(self.engine)

    def execute_commit(self, command):
        with self.Session() as session:
            session.execute(command)
            session.commit()

    def select(self, command, types=all_):
        with self.Session() as session:
            result = session.execute(command)
            return result.fetchall() if types == self.all_ else result.fetchone()

    def get_session(self):
        return self.Session()

db = DataBaseManager()