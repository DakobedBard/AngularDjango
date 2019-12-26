from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Q
from upload.models import Document
from .serializers import  DocumentSerializer, DocumentCreatetSerializer, DocumentListSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
class DocumentListAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
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

        print("The ID is "  + id_)
        print("There are  " + str(len(users)) + " users")
        if len(qs) > 0:
            print("Hello")
            return qs
        else:
            print("what")

class DocumentDetailAPIView(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    lookup_field = 'pk'

class DocumentCreateAPIView(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentCreatetSerializer
    lookup_field = 'pk'