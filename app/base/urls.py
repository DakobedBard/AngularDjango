from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import LoginView


import tabs.views


urlpatterns = [
    path("admin/", admin.site.urls),
    re_path('home/', tabs.views.home, name ='home'),
    path('login/', LoginView.as_view(), name='login'),
    # Users API
    re_path(r'^api/auth/', include('accounts.api.urls'), name='api-auth'),

]

if bool(settings.DEBUG):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
