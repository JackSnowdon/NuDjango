from django import forms
from .models import *

class HeroNameForm(forms.ModelForm):

    class Meta:
        model = Base
        fields = ['name']