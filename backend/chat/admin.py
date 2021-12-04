from django.contrib import admin

from . import models


@admin.register(models.ChatUser)
class ChatUserAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sent', 'sender')
