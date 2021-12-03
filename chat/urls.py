from django.urls import path

from chat import views
from chat import consumers

app_name = 'chat'

urlpatterns = [
    path('welcome/', views.ChatWelcomeView.as_view(), name='welcome')
]


ws_urlpatterns = [
    path('ws/chat/', consumers.ChatConsumer.as_asgi())
]
