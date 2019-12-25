from django.urls import re_path

from .views import DocumentListAPIView , DocumentDetailAPIView, DocumentCreateAPIView # ProductListAPIView, ProductRetrieveAPIView,\


app_name = 'document-api'

urlpatterns = [
    re_path(r'^$', DocumentListAPIView.as_view(), name='list'),
    re_path(r'^(?P<pk>\d+)/$', DocumentDetailAPIView.as_view(), name='detail'),
    re_path(r'create/$', DocumentCreateAPIView.as_view(), name='create')
]