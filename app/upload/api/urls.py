from django.urls import re_path

from .views import DocumentListAPIView , DocumentDetailAPIView, DocumentCreateAPIView, DocumentAPIView

app_name = 'document-api'

urlpatterns = [
    re_path(r'^$', DocumentListAPIView.as_view(), name='list'),
    re_path(r'^(?P<pk>\d+)/$', DocumentDetailAPIView.as_view(), name='detail'),
    re_path(r'create/$', DocumentCreateAPIView.as_view(), name='create'),
    re_path(r'^list/(?P<id>.+)/$', DocumentAPIView.as_view(), name='list-users')
]