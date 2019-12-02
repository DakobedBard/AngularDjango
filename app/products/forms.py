

from django import forms
from upload.models import Document

class DocumentForm(forms.Form):
    title = forms.CharField()