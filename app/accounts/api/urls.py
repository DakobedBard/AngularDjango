from django.conf.urls import url, include
from django.urls import path, include, re_path
from accounts.api.views import UserLoginView

from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token # accounts app

from .views import AuthAPIView, RegisterAPIView, UserCreateAPIView
urlpatterns = [
    re_path(r'^$', AuthAPIView.as_view(), name='loginView'),
    re_path(r'^register/$', UserCreateAPIView.as_view(), name='register'),
    re_path(r'login/', UserLoginView.as_view(),name='login')
]