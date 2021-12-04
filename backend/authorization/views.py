from rest_framework.authtoken.views import ObtainAuthToken

from .serializers import UsernameAuthTokenSerializer


class UsernameObtainAuthToken(ObtainAuthToken):
    serializer_class = UsernameAuthTokenSerializer
