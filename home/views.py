from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "index.html")

def oindex(request):
    return render(request, "oindex.html")