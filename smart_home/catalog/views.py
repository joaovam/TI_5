from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from catalog.models import ExampleModel
from smart_home.serializers import ExampleModelSerializer
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

from rest_framework import viewsets

from smart_home.serializers import ExampleModelSerializer
from .models import ExampleModel



class ExampleModelViewSet(viewsets.ModelViewSet):
    queryset = ExampleModel.objects.all().order_by('firstname')
    serializer_class = ExampleModelSerializer


""""
def turn_light_on():
def turn_light_off():
def turn_AC_on:



"""
