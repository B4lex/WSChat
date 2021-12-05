from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins

from chat.models import Message
from chat.serializers import MessageSerializer


class MessageViewSet(
    mixins.ListModelMixin,
    GenericViewSet
):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
