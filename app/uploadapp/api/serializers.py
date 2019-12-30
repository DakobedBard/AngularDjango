from rest_framework import serializers
from uploadapp.models import  DocumentFile


class DocumentFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentFile
        fields = "__all__"

