from django.contrib import messages
from django.shortcuts import redirect, render, reverse, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import *

# Create your views here.

@login_required
def start_menu(request):
    profile = request.user.profile
    heroes = profile.heroes.filter(alignment="Player")
    return render(request, "start_menu.html", {"heroes": heroes})