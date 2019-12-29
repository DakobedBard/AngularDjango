from django.db import models
from rest_framework.reverse import reverse
from django.conf import settings

class Document(models.Model):
    name = models.CharField(max_length=30, default="document.txt")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploadfile = models.FileField(upload_to='mediafiles/%Y/%m/%d/', max_length=255, null=True,blank=True)
    s3Path = models.CharField(max_length=500, default='document.txt')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bucket=models.CharField(max_length=50, default="basedjango")
    extension = models.CharField(max_length=50, default="txt")
    type = models.CharField(max_length=15, default='text')
    def __str__(self):
        return str(self.user.username)
    @property
    def owner(self):
        return self.user
    def get_api_url(self):
        return reverse("list")




