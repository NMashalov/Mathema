from django.shortcuts import render
from webchat.models import Chat
from webchat.serializers import ChatSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view,  permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.renderers import JSONRenderer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def history(request):

    user = request.user

    chat = Chat.objects.get(user_id=user)


    return Response({
        'data': JSONRenderer().render(ChatSerializer(chat).data)
    })

