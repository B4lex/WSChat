from django.urls import path

from authorization import views

app_name = 'authorization'

urlpatterns = [
    path('token/', views.UsernameObtainAuthToken.as_view(), name='token')
]
