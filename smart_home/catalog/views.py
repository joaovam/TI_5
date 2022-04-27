from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import json
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

def change_option(request):
    print("Em produção")

def ret_devices(request):
    response = []
    for dev in arduino.devices:
        aux = dev.__dict__
        aux.pop('_state')
        aux.pop('id')
        print(aux)
        response.append(aux)

    print(response)
    # for dev in arduino.devices:
    return JsonResponse(dict(Devices=response))

def ret_lights(request):
    response = []
    for dev in arduino.devices:
        if dev.type_device=='luz':
            aux = dev.__dict__
            aux.pop('_state')
            aux.pop('id')
            print(aux)
            response.append(aux)
    print(response)
    return JsonResponse(dict(Devices=response))

def ret_AC(request):
    response = []
    for dev in arduino.devices:
        if dev.type_device=='AC':
            aux = dev.__dict__
            aux.pop('_state')
            aux.pop('id')
            print(aux)
            response.append(aux)
    print(response)
    return JsonResponse(dict(Devices=response))

def ret_lockers(request):
    response = []
    for dev in arduino.devices:
        if dev.type_device=='Tranca':
            aux = dev.__dict__
            aux.pop('_state')
            aux.pop('id')
            print(aux)
            response.append(aux)
    print(response)
    return JsonResponse(dict(Devices=response))


class ExampleModelViewSet(viewsets.ModelViewSet):
    queryset = ExampleModel.objects.all().order_by('firstname')
    serializer_class = ExampleModelSerializer


""""

def turn_light_off():
def turn_AC_on:



"""
