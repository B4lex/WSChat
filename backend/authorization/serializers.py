from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers
from rest_framework.authtoken.serializers import AuthTokenSerializer


class UsernameAuthTokenSerializer(AuthTokenSerializer):
    password = None

    def validate(self, attrs):
        username = attrs.get('username')

        if username:
            user = authenticate(
                request=self.context.get('request'),
                username=username
            )
        else:
            msg = _('Must include "username"')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs
