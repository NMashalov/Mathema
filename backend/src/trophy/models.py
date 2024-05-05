from django.db import models
from person.models import User


# Create your models here.
class Trophy(models.Model):
    id = models.UUIDField(primary_key=True)


class UserTrophy:
    trophy = models.ForeignKey(Trophy)
    user = models.ForeignKey(User)