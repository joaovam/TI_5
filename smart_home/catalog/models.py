from typing import Union, List

from django.db import models
import socket
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

    def __init__(self, status: bool, name: str, ID: str, type_device: str, temperature: int=None):
        self.status = status
        self.name = name
        self.ID = ID
        self.temperature = temperature
        self.type_device = type_device



class Arduino:
    """
    Arduino class
    Used to store Arduino's Address, port and devices
    """
    ip: str
    port: int


    def __init__(self, ip: str, port: int):

        self.address = (ip, port)
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.devices = []
        self.devices.append(Device(False,"luz 1","0","luz"))
        self.devices.append(Device(False, "luz 2", "1", "luz"))
        self.devices.append(Device(False,"Ar Condicionado","2","AC",20))
        self.devices.append(Device(False,"Tranca da porta","3","Tranca"))

    def send_message(self, message: bytes):
        self.sock.sendto(message, self.address)

    def close_connection(self):
        self.sock.close()



