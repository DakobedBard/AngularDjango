from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import  action
from django.db.models import Q
from upload.models import Document
from .serializers import  DocumentSerializer, DocumentCreateSerializer, DocumentListSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
User = get_user_model()
from aws.s3Client import s3Client
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
class DocumentAPIView(mixins.CreateModelMixin,generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        userID = self.kwargs['id']
        id_ = userID.split('=')[-1]
        users = User.objects.all().filter(id=id_)
        qs = Document.objects.all().filter(user=id_)
        if len(qs) > 0:

            return qs
        else:
            return {}

class DocumentDetailAPIView(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    lookup_field = 'pk'
from rest_framework.parsers import FormParser, MultiPartParser,FileUploadParser
from rest_framework.views import APIView
class DocumentCreateAPIView(APIView):
    queryset = Document.objects.all()
    serializer_class = DocumentCreateSerializer
    permission_classes = []
    parser_classes = (FormParser, MultiPartParser, FileUploadParser)
    def __init__(self):
        user = User.objects.all().filter(username='billystrings')
        self.s3Client = s3Client('basedjango')
        print("I get here in the server1")

    def post(self, request, *args, **kwargs):
        user = request.data.get('user')
        print(user)
        print(" dfd " + str(request.data))
        # data = request.data
        serializer = DocumentCreateSerializer(data=request.data)
        print("I get here in the server")
        if serializer.is_valid():
            serializer.save()
            #     uploadFile = serializer.data.get('filename')
            #     print("the type of uploadFile is " + uploadFile)
            #     # self.s3Client.upload_file(uploadFile,uploadFile.split('/')[-1])
            print("I get here2 in the server")
            return Response(serializer.data, status=201)
        else:
            print("serializer data " + str(serializer.data))
            print("I get here3 in the server")
            print(serializer.errors)
            return Response(serializer.errors, status=400)