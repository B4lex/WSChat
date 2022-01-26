import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model

from authorization.serializers import ChatUserSerializer
from chat.models import Room
from chat.serializers import MessageSerializer


User = get_user_model()


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
        serialized_data = json.loads(text_data)
        action_type = serialized_data.get('type')
        data = None

        if action_type == 'message':
            message = {
                **serialized_data['data'],
                'room': room.id
            }
            serializer = MessageSerializer(data=message, context=self.scope)
            await sync_to_async(serializer.is_valid)()
            await sync_to_async(serializer.save)()
            data = await sync_to_async(getattr)(serializer, 'data')
        elif action_type == 'typing':
            user = await sync_to_async(User.objects.get)(
                id=serialized_data['data']['user_id']
            )
            data = await sync_to_async(getattr)(
                ChatUserSerializer(user), 'data'
            )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'spread_event',
                'serialized_data': {'type': action_type, 'data': data}
            }
        )

    async def spread_event(self, event):
        await self.send(text_data=json.dumps(
            event['serialized_data']
        ))
