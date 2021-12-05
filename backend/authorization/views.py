from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins

from .models import ChatUser
from .serializers import (
    UsernameAuthTokenSerializer,
    ChatUserSerializer
)


class UsernameObtainAuthToken(ObtainAuthToken):
    serializer_class = UsernameAuthTokenSerializer


class ChatUserViewSet(
    mixins.RetrieveModelMixin,
    GenericViewSet
):
    lookup_field = 'auth_token'
    serializer_class = ChatUserSerializer
    queryset = ChatUser.objects.all()
