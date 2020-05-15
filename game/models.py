from django.db import models
from world.models import Base
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class SaveSlot(models.Model):
    save_name = models.CharField(max_length=255)
    hero = models.OneToOneField(Base, on_delete=models.CASCADE)
    kills = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100000)], default=0
    )

    def __str__(self):
        return self.save_name

