from django.urls import path
from .views import *

urlpatterns = [
    path('start_menu/', start_menu, name="start_menu"),
    path(r'start_new_game/<int:pk>', start_new_game, name="start_new_game"),
    path(r'save_slot/<int:pk>', save_slot, name="save_slot"),
    path(r'fight/<int:pk>', fight, name="fight"),
    path(r'delete_save/<int:pk>', delete_save, name="delete_save"),
]