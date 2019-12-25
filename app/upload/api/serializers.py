from rest_framework import serializers
from upload.models import Document
from django.contrib.auth import get_user_model

from django.contrib.auth.models import User

class DocumentCreatetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            'id',
            'uploaded_at',
            's3Path',
            'bucket',
            'extension',
            'user',
            'type'
        ]
    pass
class DocumentListSerializer(serializers.ModelSerializer):
  pass

class DocumentSerializer(serializers.ModelSerializer):
    #url = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Document
        fields = [
            'id',
            'uploaded_at',
            's3Path',
            'bucket',
            'extension',
            'user'
        ]

    def get_url(self, obj):
        return obj.get_api_url()