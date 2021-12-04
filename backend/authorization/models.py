from django.contrib.auth.models import AbstractUser


class ChatUser(AbstractUser):
    required_fields = None
