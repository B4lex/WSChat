from django.urls import path
from rest_framework.routers import DefaultRouter

from authorization import views

app_name = 'authorization'

router = DefaultRouter()
router.register('users', views.ChatUserViewSet, basename='users')

urlpatterns = [
    path('token/', views.UsernameObtainAuthToken.as_view(), name='token'),
    *router.urls
]
