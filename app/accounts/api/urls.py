from django.conf.urls import url, include
from django.urls import path, include, re_path
from accounts.api.views import UserLoginView, UserCreateAPIView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    re_path(r'login/', UserLoginView.as_view(),name='login'),
    re_path(r'api/auth/token',obtain_jwt_token),
]