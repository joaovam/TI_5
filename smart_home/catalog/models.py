from typing import Union, List

from django.db import models
import requests
from enum import Enum     # for enum34, or the stdlib version
# Create your models here.
class ExampleModel(models.Model):
    firstname = models.CharField(max_length=200)
    lastname  = models.CharField(max_length=200)
    objects = models.Manager()

    def __str__(self):
        return self.firstname

# from aenum import Enum  # for the aenum version

class Device:
    status: bool
    name: str
    ID: str
    temperature: int
    type_device: str
    #objects = models.Manager()

    def __init__(self, status: bool, name: str, ID: str, type_device: str, temperature: int = None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.status = status
        self.name = name
        self.ID = ID
        self.temperature = temperature
        self.type_device = type_device

    # def __str__(self):
    #     return self.name
    def from_json(body):
        device  = Device(body['status'],body['name'],body['ID'],body['type_device'],body['temperature'])
        return device


class Arduino:
    """
    Arduino class
    Used to store Arduino's Address, port and devices
    """



    def __init__(self, ip: str):

        self.address = ip
        self.devices.append(Device(False,"luz da sala","0","luz"))
        self.devices.append(Device(False, "luz do quarto", "1", "luz"))
        self.devices.append(Device(False,"Ar Condicionado","2","AC",20))
        self.devices.append(Device(False,"Tranca da porta","3","Tranca"))

    def send_message(self, message: str):
        requests.get(f"{self.address}/{message}")


    def close_connection(self):
        self.sock.close()



