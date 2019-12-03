from django.shortcuts import render
from .forms import LoginForm, SignUPForm
# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
def login(request, *args, **kwargs):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
        username = request.POST.get('username')
        password = request.POST.get('password')
        print("The username is " + str(username))
        print("The password is " + str(password))
    else:
        form = LoginForm()
        return render(request, "registration/login.html", {
            'form': form
        })

def signup(request):
    if request.method == 'POST':
        form = SignUPForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = SignUPForm()
    return render(request, "registration/signup.html", {
        'form':form
    })
