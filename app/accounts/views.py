from django.shortcuts import render

# Create your views here.

import requests

def login(request, *args, **kwargs):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

    context = {}

