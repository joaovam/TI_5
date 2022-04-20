from rest_framework import serializers
from catalog.models import ExampleModel

class ExampleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        fields = ('firstname', 'lastname')