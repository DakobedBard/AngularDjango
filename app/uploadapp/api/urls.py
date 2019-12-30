from django.urls import path
from uploadapp.api.views import *

urlpatterns = [
    path(r'list/', DocumentListAPIView.as_view(), name='list'),
    #
    # path(r'^(?P<pk>\d+)/$', DocumentDetailAPIView.as_view(), name='detail'),
    # path(r'create/$', DocumentCreateAPIView.as_view(), name='create'),
    # path(r'^list/(?P<id>.+)/$', DocumentAPIView.as_view(), name='list-users'),

    path('', FileUploadView.as_view()),
    path('documents',(DocumentUploadView.as_view()))
]