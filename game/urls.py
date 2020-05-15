from django.urls import path
from .views import *

urlpatterns = [
    path('start_menu/', start_menu, name="start_menu"),
]