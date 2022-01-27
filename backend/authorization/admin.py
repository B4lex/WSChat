from django.contrib import admin

from . import models


@admin.register(models.ChatUser)
class ChatUserAdmin(admin.ModelAdmin):
    fields = ('username', 'avatar')
