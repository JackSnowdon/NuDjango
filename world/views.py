from django.contrib import messages
from django.shortcuts import redirect, render, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import *

# Create your views here.

@login_required
def world_index(request):
    profile = request.user.profile
    heroes = profile.heroes.all()
    print(heroes)
    return render(request, "world_index.html", {"heroes": heroes})

@login_required
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

@login_required
def single_hero(request, pk):
    hero = get_object_or_404(Base, pk=pk)
    return render(request, "single_hero.html", {"hero": hero})