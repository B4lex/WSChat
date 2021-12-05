import json
from functools import cached_property

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from chat.models import Room, Message
from chat.serializers import MessageSerializer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'my_room'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        message = {
            **json.loads(text_data),
            'room': self.room.id
        }
        serializer = MessageSerializer(data=message)
        serializer.is_valid()
        serializer.save()
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'serialized_data': serializer.data
            }
        )

    def chat_message(self, event):
        self.send(text_data=json.dumps(
            event['serialized_data']
        ))

    @cached_property
    def room(self):
        return Room.objects.first()
