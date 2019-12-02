from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from upload.models import Document
User = get_user_model()
class TestDocumentPITestCase(APITestCase):
    def setUp(self):
        user = User.objects.create(username='testuser', email = 'test@test.com')
        user.set_password("somerandomepassword")
        user.save()

        document_object = Document.objects.crete(
            s3Path='tusk.jp',
            user = user.id,
            bucket = 'basedjango',
            extension='.txt'

        )

