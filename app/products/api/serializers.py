from rest_framework import serializers
# from products.models import Product
from upload.models import Document, StyleTransferModel
from django.contrib.auth import get_user_model
# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = [
#             'id',
#             'title',
#             'description',
#             'price'
#         ]


User = get_user_model()

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

class StyleTransferSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = StyleTransferModel
        fields = [
            'url',
            'pk',
            'user',
            'title',
            'description',
            'base_image_name',
            'style_image_name',
            'base_image',
            'style_image',
            'output_image'
        ]
    def get_url(self, obj):
        return obj.get_api_url()

class UserCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(label="Email Address")
    email2 = serializers.EmailField(label="Confirm Address")
    class Meta:
        model = User
        fields =[
            'username',
            'email',
            'email2',
            'password'
        ]
        extra_kwargs = {"password" : {"write_only":True}}
    def validate(self, data):
        return data

class UserCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(label="Email Address")
    email2 = serializers.EmailField(label="Confirm Address")
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'email2',
            'password'
        ]
    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        email = validated_data['email']
        user_obj = User(
            username = username,
            email = email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(label="Email Address")

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password'
        ]
        extra_kwargs = {'password':{"write_only": True}}
    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        email = validated_data['email']
        user_obj = User(
            username = username,
            email = email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data