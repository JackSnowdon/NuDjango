from django.db import models
from world.models import Base
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class SaveSlot(models.Model):
    save_name = models.CharField(max_length=255)
    hero = models.OneToOneField(Base, on_delete=models.CASCADE, related_name="save_slot")
    current_hp = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(50000)], default=100)
    max_hp = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(50000)], default=100)
    power = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], default=10)
    speed = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], default=5)
    gold = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(250000)], default=1)
    xp = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100000)], default=1)
    level = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)], default=1)
    kills = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100000)], default=0
    )

    def __str__(self):
        return self.save_name

