from django.urls import path
from .views import *

urlpatterns = [
    path('world_index/', world_index, name="world_index"),
    path('add_new_hero/', add_new_hero, name="add_new_hero"),
]