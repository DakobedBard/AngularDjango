from rest_framework import serializers
from uploadapp.models import  DocumentFile
from tabs.models import GuitarTab

class TabSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuitarTab
        fields = "__all__"

