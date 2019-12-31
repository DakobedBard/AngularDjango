from django.urls import path
from uploadapp.api.views import *

urlpatterns = [
    path(r'list/', DocumentListAPIView.as_view(), name='list'),
    path('', DocumentUploadView.as_view()),
    path('', DocumentFileDetailView.as_view()),
    path('<int:id>/delete/', DocumentFileDetailView.as_view()),
    path('documents',(DocumentUploadView.as_view()))
]