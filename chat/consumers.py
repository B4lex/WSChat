import json

from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.username = 'User'
        super().connect()
        self.send(json.dumps({'message': f'Hello, {self.username}'}))

    def receive(self, text_data=None, bytes_data=None):
        print(text_data, bytes_data)
        self.send(text_data)
