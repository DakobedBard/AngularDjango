from rest_framework import serializers
from uploadapp.models import File, DocumentFile
from uploadapp.models import Document
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"
class DocumentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            'id',
            'uploaded_at',
            'filename',
            'name',
            'user',
        ]
    def validate(self,data):
        print("I am here in the validator")
        return data

class DocumentListSerializer(serializers.ModelSerializer):
  pass

class DocumentSerializer(serializers.ModelSerializer):
    #url = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Document
        fields = [
            'id',
            'name',
            'uploaded_at',
            'user'
        ]

    def get_url(self, obj):
        return obj.get_api_url()
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"
    def create(self, data):
        instance = File.objects.create(**data)
        print("i'm here..")
        return data

class DocumentFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentFile
        fields = "__all__"



class DocumentSerializer(serializers.ModelSerializer):
    file = FileSerializer()
    class Meta:
        model = Document
        fields = "__all__"
    def create(self):
        print("i'm here..")