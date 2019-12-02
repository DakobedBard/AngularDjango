from django.db import models
from django.urls import reverse
from django.conf import settings


class Document(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    s3Path = models.CharField(max_length=500, default='file.txt')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bucket=models.CharField(max_length=50, default="basedjango")
    extension = models.CharField(max_length=50, default=".txt")
    type = models.CharField(max_length=15, default='text')
    def __str__(self):
        return str(self.user.username)
    @property
    def owner(self):
        return self.user
    def get_api_url(self):
        return api_reverse("list")

class StyleTransferModel(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name = 'user+')
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=200, default='')
    base_image_name = models.CharField(max_length=50, default="base")
    style_image_name = models.CharField(max_length=50, default ="stlye")
    base_image = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='base-image+', default='')
    style_image = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='style-image+', default='')
    output_image = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='output-image+',default='')
