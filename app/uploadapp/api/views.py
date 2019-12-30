from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import  action
from django.db.models import Q
from uploadapp.models import Document
from .serializers import  DocumentSerializer, DocumentCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
User = get_user_model()
from aws.s3Client import s3Client
from uploadapp.api.serializers import FileSerializer

class DocumentListAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        qs = Document.objects.all()
        query = self.request.GET.get("q")
        userID = self.request.query_params.get('id', None)

        if query is not None:
            qs = qs.filter(Q(title__icontains=query))
        return qs
    def post(self,request,*args, **kwargs):
        return self.create(request, *args, **kwargs)



class FileUploadView(APIView):
    parser_class = (FileUploadParser,)
    
    def post(self, request, *args, **kwargs):
      
      file_serializer = FileSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
