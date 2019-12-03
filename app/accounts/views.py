from django.shortcuts import render
from .forms import LoginForm
# Create your views here.
from django.shortcuts import render, redirect

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

