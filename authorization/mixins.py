from django.http import HttpResponseRedirect
from django.urls import reverse_lazy


class RedirectAuthorizedMixin:
    def dispatch(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return HttpResponseRedirect(reverse_lazy('chat:welcome'))
        return super().dispatch(*args, **kwargs)