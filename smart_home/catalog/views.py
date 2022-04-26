from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from catalog.models import ExampleModel
from smart_home.serializers import ExampleModelSerializer
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

from rest_framework import viewsets

from smart_home.serializers import ExampleModelSerializer
from .models import *

arduino = Arduino(ip="192.168.1.60",port=1234)

def turn_light_on(request):
    arduino.send_message(bytes("ta ligado", "utf-8"))
    return HttpResponse("200")
def close_connection(request):
    arduino.close_connection()
    return HttpResponse("connection closed")

class ExampleModelViewSet(viewsets.ModelViewSet):
    queryset = ExampleModel.objects.all().order_by('firstname')
    serializer_class = ExampleModelSerializer


""""

def turn_light_off():
def turn_AC_on:



"""
