from django.db import models

# Create your models here.
class VarnikeCases:
    title = models.CharField(
        max_length=20
    )
    photo = models.ImageField(upload_to="cars")
    setting =  models.TextField(max_length=4000)
    answer =  models.TextField(max_length=4000)