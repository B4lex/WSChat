import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from chat.models import Room
from chat.serializers import MessageSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'global'
        if self.scope['user'].is_authenticated:
            await self.accept()
        else:
            await self.close()

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        room = await sync_to_async(Room.objects.first)()
        message = {
            **json.loads(text_data),
            'room': room.id
        }
        serializer = MessageSerializer(data=message, context=self.scope)
        await sync_to_async(serializer.is_valid)()
        await sync_to_async(serializer.save)()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'serialized_data': await sync_to_async(getattr)(serializer, 'data')
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(
            event['serialized_data']
        ))
