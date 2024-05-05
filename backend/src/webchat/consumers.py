import json
from django.conf import settings
from openai import AsyncOpenAI
from webchat.models import Chat, Message
from channels.generic.websocket import AsyncWebsocketConsumer
import typing as tp
# gets API Key from environment variable OPENAI_API_KEY


SYSTEM_RULE = '.'.join([
    'Ты ассистент на детском образовательном сайте',
    'Не ругайся и будь вежлив',
    'Расскажи, что на сайте можно играть в шахматы, рисовать и изучать журнал Квант.',
    'Не отвечай на вопросы не касающиеся навигации.'
])


class OpenAIChat:
    SYSTEM_PROMPT = {
        'role':'system',
        'content': SYSTEM_RULE
    }

    def __init__(self):
        self.client = AsyncOpenAI(
            base_url="https://openrouter.ai/api/v1",
                api_key=settings.OPENROUTER_API_KEY,
        )

    async def send_msg(self, *msg:list[dict]):
        return self.client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "MATHEMA", 
            },
            model="openai/gpt-3.5-turbo",
            messages=[
                self.SYSTEM_PROMPT,

            ],
            stream=True
        )
    

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.user = self.scope["user"]
        self.session = self.scope["session"]
        self.db_chat = Chat.objects.filter(session_id=self.session)
        self.ai_chat = OpenAIChat()

    def disconnect(self, close_code):
        del self.ai_chat

    def create_msg(self, text: str, role: tp.Literal[Message.USER,Message.ASSISTANT]):
        Message.objects.create(
            chat=self.db_chat,
            role=role,
            text = text,
            status = Message.ACTIVE
        )

    async def receive(self, text_data: str):

        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        self.create_msg(
            text=message,
            role=Message.USER
        )
        response = self.ai_chat.send_msg()

        full_msg = []

        async for chunk in response:
            partial_answer = await chunk.choices[0].delta.content
            full_msg.append(partial_answer)
            self.send(text_data=json.dumps({"message": partial_answer}))

        self.create_msg(
            text=''.join(full_msg),
            role=Message.ASSISTANT
        )