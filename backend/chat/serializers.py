from rest_framework import serializers

from authorization.serializers import ChatUserSerializer
from chat.models import Message


class CurrentUserDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['user']


class MessageSerializer(serializers.ModelSerializer):
    sender = ChatUserSerializer(read_only=True)
    current_user = serializers.HiddenField(default=CurrentUserDefault())

    class Meta:
        model = Message
        fields = ('id', 'sender', 'content',
                  'sent', 'room', 'current_user')
        extra_kwargs = {
            'room': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        validated_data['sender_id'] = validated_data.pop('current_user').id
        return Message.objects.create(**validated_data)
