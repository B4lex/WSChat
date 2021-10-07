from django.urls import path

from authorization import views

app_name = 'auth'

urlpatterns = [
    path('login/', views.LoginPageView.as_view(), name='login')
]
