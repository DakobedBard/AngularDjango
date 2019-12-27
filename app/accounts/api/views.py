from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.filters import (SearchFilter, OrderingFilter)
from rest_framework.mixins import DestroyModelMixin, UpdateModelMixin

from accounts.api.serializers import UserLoginSerializer, UserCreateSerializer

from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView
    )

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)

from .permissions import AnonPermissionOnly

User = get_user_model()

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserCreateSerializer
        if serializer.validate("",data):
            user = User(username = data['username'], email=data['email'], password =data['password'])
            user.save()
            return Response(data, status=HTTP_200_OK)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer
    print("I'm here ")
    def post(self, request, *args, **kwargs):
        data = request.data
        print("I'm also here")
        serializer = UserLoginSerializer
        data["token"] ='some random token'
        if serializer.validate("",data):
            return Response(data, status=HTTP_200_OK)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)










