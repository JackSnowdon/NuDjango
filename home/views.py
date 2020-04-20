from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.

def index(request):
    return render(request, "index.html")

@login_required
def oindex(request):
    if request.user.profile.staff_access:
        return render(request, "oindex.html")
    else:
        messages.error(
            request, "You Don't Have The Required Permissions", extra_tags="alert"
        )
        return redirect("index")