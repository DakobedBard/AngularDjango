from django.conf.urls import url, include
from django.urls import path, include, re_path
from accounts.api.views import UserLoginView, UserCreateAPIView

urlpatterns = [
    re_path(r'^register/$', UserCreateAPIView.as_view(), name='register'),
    re_path(r'login/', UserLoginView.as_view(),name='login')
]