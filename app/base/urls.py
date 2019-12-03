from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import LoginView
from rest_framework.authtoken import views
from accounts.views import login, signup
import tabs.views


urlpatterns = [
    path("admin/", admin.site.urls),
    re_path('home/', tabs.views.home, name ='home'),
    path('login/', login, name='loginClient'),
    path('singup/', signup, name='signup'),

    # Users API
    re_path(r'^api/auth/', include('accounts.api.urls'), name='api-auth'),
    path('api-token-auth/', views.obtain_auth_token, name='api-token-auth'),

]

if bool(settings.DEBUG):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
