from rest_framework import serializers

from authorization.models import ChatUser
from authorization.serializers import ChatUserSerializer
from chat.models import Message


class MessageSerializer(serializers.ModelSerializer):
    sender = ChatUserSerializer(read_only=True)
    sender_id = serializers.PrimaryKeyRelatedField(queryset=ChatUser.objects.all())

    class Meta:
        model = Message
        fields = ('id', 'sender', 'sender_id',
                  'content', 'sent', 'room')
        extra_kwargs = {
            'room': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        validated_data['sender_id'] = validated_data['sender_id'].id
        return Message.objects.create(**validated_data)
