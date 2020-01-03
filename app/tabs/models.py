from django.db import models
from django.conf import settings

class Note():
    gString = models.CharField(blank=False, null=False)
    fret = models.CharField(blank=False, null=False),
    beat = models.IntegerField(blank=False, null=False)

class GuitarTab(models.Model):
    name = models.CharField(max_length=30, default="firstTab.txt")





