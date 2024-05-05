from rest_framework import status
from webchat.models import Message, Chat
from rest_framework import serializers
from rest_framework.response import Response



class ChatMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ('id','role','text')

class ChatSerializer(serializers.ModelSerializer):

    chat_messages = ChatMessageSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id','role','text','chat_messages')

