from django.urls import path
from .views import *

urlpatterns = [
    path('world_index/', world_index, name="world_index"),
    path('add_new_hero/', add_new_hero, name="add_new_hero"),
    path(r'single_hero/<int:pk>', single_hero, name="single_hero"),
    path('world_panel/', world_panel, name="world_panel"),
    path('add_new_enemy/', add_new_enemy, name="add_new_enemy"),
]