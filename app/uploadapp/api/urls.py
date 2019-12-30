from django.urls import path
from uploadapp.api.views import *

urlpatterns = [
    path('', FileUploadView.as_view())
]