from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

import upload.views



from pages.views import FrontendRenderView


urlpatterns = [
    path("admin/", admin.site.urls),

    # API
    re_path(r'api/documents/', include("products.api.urls")),
]

if bool(settings.DEBUG):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
