import ast
import json
from typing import List

from pydantic import BaseModel

from back.DataBaseManager.models import Task
from back.shems import SubmitAnswer


def parse_submit_answer_list(data: str) -> List[SubmitAnswer]:

    return [SubmitAnswer(**item) for item in data]



class AnsweredTask(BaseModel):
    task_id: int
    content: str
    answer: str


def match_tasks_with_answers(
        tasks: List[Task],
        answers: List[SubmitAnswer]
) -> List[AnsweredTask]:
    answers_map = {a.id_task: a.solution for a in answers}

    matched = []
    for task in tasks:
        if task.id in answers_map:
            matched.append(AnsweredTask(
                task_id=task.id,
                content=task.content,
                answer=answers_map[task.id]
            ))
    return matched
