from rest_framework import serializers
from upload.models import Document
from django.contrib.auth import get_user_model

from django.contrib.auth.models import User

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