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


@login_required
def save_slot(request, pk):
    this_save = get_object_or_404(SaveSlot, pk=pk)
    return render(request, "save_slot.html", {"this_save": this_save})


@login_required
def delete_save(request, pk):
    this_save = get_object_or_404(SaveSlot, pk=pk)
    profile = request.user.profile
    if profile == this_save.hero.created_by or profile.staff_access:
        messages.error(request, 'Deleted {0}'.format(this_save.save_name), extra_tags='alert')
        this_save.delete()
        return redirect(reverse("start_menu"))
    else:
        messages.error(
            request, "You Don't Have The Required Permissions", extra_tags="alert"
        )
        return redirect("start_menu") 