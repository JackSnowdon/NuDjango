from django.urls import path
from .views import *

urlpatterns = [
    path('start_menu/', start_menu, name="start_menu"),
    path(r'start_new_game/<int:pk>', start_new_game, name="start_new_game"),
]