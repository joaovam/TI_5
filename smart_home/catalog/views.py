import http.client

from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import json
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

from smart_home.serializers import ExampleModelSerializer
from .models import *

arduino = Arduino(ip="192.168.1.60", port=1234)


def turn_light_on(request):
    arduino.send_message(bytes("ta ligado", "utf-8"))
    return HttpResponse("200")


def close_connection(request):
    arduino.close_connection()
    return HttpResponse("connection closed")


def set_device(original_device, new_device):
    status_changed = False
    temperature_changed = False
    if original_device.ID != new_device.ID:
        return None
    if original_device.status != new_device.status:
        status_changed = True
    if original_device.temperature != new_device.temperature:
        temperature_changed = True

    response_device = dict(ID=new_device.ID)
    if status_changed:
        response_device['status'] = new_device.status
        print("status foi alterado")

    if temperature_changed:
        response_device['temperature'] = new_device.temperature
        print("temperatura foi alterada")
    print("==================== fazer request para arduino============")
    print(response_device)


@csrf_exempt
def change_option(request):
    print(
        "===================================================changeOptions em implementação======================================")
    body = json.loads(request.body)
    # body = body['Device']
    print(body)
    for device in arduino.devices:
        if device.ID is body['ID']:
            print(f"device inicial{device}")
            new_device = Device.from_json(body)
            set_device(device, new_device)
            arduino.devices.remove(device)
            device = new_device
            arduino.devices.append(new_device)
            print(f"novo device{new_device}")
            print(f"device final:{device}")
            return JsonResponse(body)

    return HttpResponse("Dispositivo não encontrado")


def ret_devices(request):
    response = []
    for dev in arduino.devices:
        aux = dev.__dict__
        print(dev)
        print(aux)
        # aux.pop('_state')
        # aux.pop('id')
        print(aux)
        response.append(aux)

    # print(response)
    # for dev in arduino.devices:
    return JsonResponse(dict(response))


def ret_lights(request):
    response = []
    for dev in arduino.devices:
        if dev.type_device == 'luz':
            aux = dev.__dict__
            # aux.pop('_state')
            # aux.pop('id')
            print(aux)
            response.append(aux)
    print(response)
    return JsonResponse(dict(Devices=response))


def ret_AC(request):
    response = []
    for dev in arduino.devices:
        if dev.type_device == 'AC':
            aux = dev.__dict__
            # aux.pop('_state')
            # aux.pop('id')
            print(aux)
            response.append(aux)
    print(response)
    return JsonResponse(dict(Devices=response))


def ret_lockers(request):
    response = []
    for dev in arduino.devices:
        if dev.type_device == 'Tranca':
            aux = dev.__dict__
            # aux.pop('_state')
            # aux.pop('id')
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
