"""smart_home URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os.path
from pathlib import Path


from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
import sys
from catalog.views import *
from rest_framework import routers
from catalog import views


router = routers.DefaultRouter()
router.register(r'ExampleModel', views.ExampleModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('getData/',getData),
    path('changeOptions',change_option),
    path('devices',ret_devices),
    path('lights',ret_lights),
    path('lockers',ret_lockers),
    path('ac',ret_AC),
    path('',include(router.urls)),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^.*', TemplateView.as_view(template_name="home.html"), name="home")
]
# Use static() to add url mapping to serve static files during development (only)

#urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
