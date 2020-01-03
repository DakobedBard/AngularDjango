from django.urls import path
from tabs.api.views import TabListAPIView

urlpatterns = [
    path(r'', TabListAPIView.as_view(), name='list'),
]