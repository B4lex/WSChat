from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.urls import reverse_lazy


class ChatWelcomeView(LoginRequiredMixin, TemplateView):
    template_name = 'chat/welcome.html'
    login_url = reverse_lazy('auth:login')
