from django.contrib.auth import login
from django.views.generic import FormView
from django.urls import reverse_lazy

from authorization.forms import UsernameLoginForm
from authorization.mixins import RedirectAuthorizedMixin


class LoginPageView(RedirectAuthorizedMixin, FormView):
    template_name = 'auth/login.html'
    success_url = reverse_lazy('chat:welcome')
    form_class = UsernameLoginForm

    def form_valid(self, form):
        user = form.authenticate(self.request)
        if user:
            login(self.request, user)
        return super().form_valid(form)
