from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 
from accounts.models import Profile

# Create your models here.

Player = "Player"
Enemy = "Enemy"


ALIGNCHOICES = (
        (Player, "Player"),
        (Enemy, "Enemy"),
    )
    

class Base(models.Model):
    name = models.CharField(max_length=255)
    current_hp = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(50000)], default=100)
    max_hp = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(50000)], default=100)
    power = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], default=10)
    speed = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], default=5)
    gold = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(250000)], default=1)
    xp = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100000)], default=1)
    level = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)], default=1)
    created_by = models.ForeignKey(Profile, related_name='heroes', on_delete=models.PROTECT)
    alignment = models.CharField(
        choices=ALIGNCHOICES, default=Player, max_length=100)

    def __str__(self):
        return self.name

