from django import forms
from .models import *

class HeroNameForm(forms.ModelForm):

    class Meta:
        model = Base
        fields = ['name']


class CreateEnemyForm(forms.ModelForm):

    class Meta:
        model = Base
        exclude = ['current_hp', 'alignment', 'created_by']


class AdminEditBaseForm(forms.ModelForm):

    class Meta:
        model = Base
        exclude = ['created_by']