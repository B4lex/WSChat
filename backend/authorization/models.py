from django.contrib.auth.models import AbstractUser
from django.db import models


class ChatUser(AbstractUser):
    required_fields = None

    avatar = models.ImageField(null=True, blank=True, upload_to='avatars/')
