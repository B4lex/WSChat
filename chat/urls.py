from django.urls import path
from chat import views

app_name = 'chat'

urlpatterns = [
    path('welcome/', views.ChatWelcomeView.as_view(), name='welcome')
]
