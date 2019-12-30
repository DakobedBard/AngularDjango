from django.db import models
from rest_framework.reverse import reverse
from django.conf import settings

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name


class File(models.Model):
    file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name
class RestDocument(models.Model):
    documentID = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, default="document.txt")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.ForeignKey(File, on_delete=models.CASCADE, default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default =1 )

    def __str__(self):
        return str(self.user.username)
    @property
    def owner(self):
        return self.user
    def get_api_url(self):
        return reverse("list")

class DocumentFile(models.Model):
    file = models.FileField(blank=False, null=False)
    name = models.CharField(max_length=30, default="document.txt")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default =1 )

class Document(models.Model):
    documentID = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, default="document.txt")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.ForeignKey(File, on_delete=models.CASCADE, default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default =1 )

    def __str__(self):
        return str(self.user.username)
    @property
    def owner(self):
        return self.user
    def get_api_url(self):
        return reverse("list")
