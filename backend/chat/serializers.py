from rest_framework import serializers

from authorization.serializers import ChatUserSerializer
from chat.models import Message


class MessageSerializer(serializers.ModelSerializer):
    author = ChatUserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'author', 'content', 'sent')
