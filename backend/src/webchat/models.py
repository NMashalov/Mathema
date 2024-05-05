from django.db import models
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session

# Create your models here.

class Chat(models.Model):
    id = models.UUIDField(primary_key=True)
    session_id = models.ForeignKey(Session, on_delete=models.SET_NULL,  null=True)
    user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_dttm = models.DateTimeField("date published")

class Message(models.Model):
    USER = "US"
    ASSISTANT = "AS"

    ROLES = {
        USER: "USER",
        ASSISTANT: "ASSISTANT",
    }

    DELETED = 'DE'
    ACTIVE = 'AC'

    STATUS = {
        DELETED: "DE",
        ACTIVE: "AC",
    }

    id = models.UUIDField(primary_key=True)
    text = models.TextField(max_length=4000)
    role = models.CharField(
        max_length=2,
        choices=ROLES,
    )
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=2,
        choices=STATUS,
    )
    created_dttm = models.DateTimeField("date published")

    class Meta:
        ordering = ["created_dttm"]







