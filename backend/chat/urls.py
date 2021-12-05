from django.urls import path
from rest_framework.routers import DefaultRouter

from chat import views
from chat import consumers

app_name = 'chat'

router = DefaultRouter()
router.register('messages', views.MessageViewSet)


urlpatterns = [
    *router.urls
]


ws_urlpatterns = [
    path('ws/chat/', consumers.ChatConsumer.as_asgi())
]
