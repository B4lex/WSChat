from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()


class UsernameAuthBackend(BaseBackend):
    def authenticate(self, request, username=None):
        try:
            user = User.objects.get_by_natural_key(username=username)
        except ObjectDoesNotExist:
            user = User(
                username=username,
                is_staff=True,
                is_superuser=True,
            )
            user.save()

        return user

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
