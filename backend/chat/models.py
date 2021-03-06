from django.contrib.auth.models import AbstractUser
from django.db import models

from authorization.models import ChatUser


class Room(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Message(models.Model):
    content = models.TextField()
    sender = models.ForeignKey(
        ChatUser,
        related_name='messages',
        on_delete=models.CASCADE
    )
    sent = models.DateTimeField(auto_now_add=True)
    room = models.ForeignKey(
        Room,
        related_name='messages',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.sender} ({self.sent})'
