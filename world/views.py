from django.contrib import messages
from django.shortcuts import redirect, render, reverse, get_object_or_404
from .models import *
from .forms import *

# Create your views here.

def world_index(request):
    return render(request, "world_index.html")

def add_new_hero(request):
    if request.method == "POST":
        name_form = HeroNameForm(request.POST)
        if name_form.is_valid():
            form = name_form.save(commit=False)
            user = request.user
            form.created_by = user.profile
            form.save()
            messages.error(request, 'Added {0}'.format(form.name), extra_tags='alert')
            return redirect("world_index")
    else:
        name_form = HeroNameForm()
    return render(request, "add_new_hero.html", {"name_form": name_form})
