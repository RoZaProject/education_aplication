import gigachat
import gigachat.context
from gigachat import GigaChat
from langchain_core.messages import HumanMessage
from langchain_gigachat.chat_models import GigaChat

from back.shems import Report
from back.utils.util import match_tasks_with_answers, parse_submit_answer_list
from back.utils.variable_environment import VarEnv


class GPTService:
    def __init__(self):
        headers = {
            "X-Session-ID": "18283992-7133-4d30-a328-31d8466e5502",
        }
        gigachat.context.session_id_cvar.set(headers.get("X-Session-ID"))

        self.giga = GigaChat(
            credentials=VarEnv.GIGAGPT,
            verify_ssl_certs=False,
        )

    def ask(self, ask_text, task_text):
        messages = [
            HumanMessage(
                content=task_text + "\n" + ask_text,
            )
        ]

        response = self.giga.invoke(messages)
        return response.content

    def generate_report(self, tasks, solution):
        answers = []
        for task in match_tasks_with_answers(tasks, parse_submit_answer_list(solution)):
            answer = self.ask(ask_text=f"Я решил задачу, {task.content} и у меня получилось "
                                       f"{solution}, если я решил правильно дай комментарии если "
                                       f"нет тоже",
                              task_text="НАЧНИ ОТВЕТ С '111' если считаешь "
                                        "что  я сделал правильно и '999' если наоборот.")
            answers.append(Report(task_id=task.task_id, text=answer, status=(answer[:3] == "111")))
        return answers
