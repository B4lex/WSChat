from django import forms
from django.contrib.auth import authenticate


class UsernameLoginForm(forms.Form):

    username = forms.CharField(max_length=256)

    def authenticate(self, request):
        return authenticate(request, username=self.cleaned_data['username'])
