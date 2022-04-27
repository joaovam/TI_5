from rest_framework import serializers
from catalog.models import *

class ExampleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        fields = ('firstname', 'lastname')


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('status', 'name', 'ID', 'type_device', 'temperature')