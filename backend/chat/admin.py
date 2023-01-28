from django.contrib import admin

from . import models


@admin.register(models.Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sent', 'sender', 'content')


@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name',)
