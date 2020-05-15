from django import forms
from .models import *

class NewGameForm(forms.ModelForm):

    class Meta:
        model = SaveSlot
        fields = ['save_name']

