from django.contrib import messages
from django.shortcuts import redirect, render, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from world.models import *
from .models import *
from .forms import *

# Create your views here.

@login_required
def start_menu(request):
    profile = request.user.profile
    heroes = profile.heroes.filter(alignment="Player")
    save_slots = []
    saves = SaveSlot.objects.all() 
    for save in saves:
        save_slots.append(save.hero)
    return render(request, "start_menu.html", {"heroes": heroes, "save_slots": save_slots})


@login_required
def start_new_game(request, pk):
    chosen_hero = get_object_or_404(Base, pk=pk)
    if request.method == "POST":
        new_game_form = NewGameForm(request.POST)
        if new_game_form.is_valid():
            form = new_game_form.save(commit=False)
            form.hero = chosen_hero
            messages.error(request, "{0} Entered The Grindhouse".format(form.hero), extra_tags="alert")
            form.save()
            return redirect("start_menu")
    else:
        new_game_form = NewGameForm()       
    return render(request, "start_new_game.html", {"chosen_hero": chosen_hero, "new_game_form": new_game_form})
