from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class SubmitAnswer(BaseModel):
    id_task: int
    solution: str


class SubmitAnswers(BaseModel):
    result: List[SubmitAnswer]


class Report(BaseModel):
    task_id: int
    text: str
    status: bool
