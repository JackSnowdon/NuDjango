from django.contrib import messages
from django.shortcuts import redirect, render, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import *

# Create your views here.


@login_required
def world_index(request):
    profile = request.user.profile
    heroes = profile.heroes.filter(alignment="Player")
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
            messages.error(request, "Added {0}".format(form.name), extra_tags="alert")
            return redirect("world_index")
    else:
        name_form = HeroNameForm()
    return render(request, "add_new_hero.html", {"name_form": name_form})


@login_required
def single_hero(request, pk):
    hero = get_object_or_404(Base, pk=pk)
    return render(request, "single_hero.html", {"hero": hero})


@login_required
def world_panel(request):
    if request.user.profile.staff_access:
        enemies = Base.objects.filter(alignment="Enemy")
        heroes = Base.objects.filter(alignment="Player")
        return render(
            request, "world_panel.html", {"enemies": enemies, "heroes": heroes}
        )
    else:
        messages.error(
            request, "You Don't Have The Required Permissions", extra_tags="alert"
        )
        return redirect("world_index")


@login_required
def add_new_enemy(request):
    if request.user.profile.staff_access:
        if request.method == "POST":
            edit_form = CreateEnemyForm(request.POST)
            if edit_form.is_valid():
                form = edit_form.save(commit=False)
                form.alignment = "Enemy"
                form.current_hp = form.max_hp
                user = request.user
                form.created_by = user.profile
                form.save()
                messages.error(
                    request, "Added {0}".format(form.name), extra_tags="alert"
                )
                return redirect("world_panel")
        else:
            edit_form = CreateEnemyForm()
        return render(request, "add_new_enemy.html", {"edit_form": edit_form})
    else:
        messages.error(
            request, "You Don't Have The Required Permissions", extra_tags="alert"
        )
        return redirect("world_index")


@login_required
def admin_base_edit(request, pk):
    if request.user.profile.staff_access:
        this_base = get_object_or_404(Base, pk=pk)
        if request.method == "POST":
            edit_form = AdminEditBaseForm(request.POST, instance=this_base)
            if edit_form.is_valid():
                form = edit_form.save(commit=False)
                if form.current_hp > form.max_hp:
                    form.current_hp = form.max_hp
                    messages.error(
                    request, "Current HP Can't Exceed Max HP, Set To Max HP {0}".format(form.max_hp), extra_tags="alert"
                ) 
                form.save()
                messages.error(
                    request, "Edited {0}".format(form.name), extra_tags="alert"
                )
                return redirect("single_hero", this_base.id)
        else:
            edit_form = AdminEditBaseForm(instance=this_base)
        return render(
            request,
            "admin_base_edit.html",
            {"edit_form": edit_form, "this_base": this_base},
        )
    else:
        messages.error(
            request, "You Don't Have The Required Permissions", extra_tags="alert"
        )
        return redirect("world_index")


@login_required
def delete_base(request, pk):
    base = get_object_or_404(Base, pk=pk)
    profile = request.user.profile
    if profile == base.created_by or profile.staff_access:
        messages.error(request, 'Deleted {0}'.format(base.name), extra_tags='alert')
        base.delete()
        return redirect(reverse('world_index'))
    else:
        messages.error(
            request, "You Don't Have The Required Permissions", extra_tags="alert"
        )
        return redirect("world_index") 