from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from catalog.models import ExampleModel
from smart_home.serializers import ExampleModelSerializer
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@csrf_exempt
def get_data(request):
	data = ExampleModel.objects.all()
	if request.method == 'GET':
		serializer = ExampleModelSerializer(data, many=True)
		return JsonResponse(serializer.data, safe=False)
@csrf_exempt
def post_data(request):
	if request.method =='POST':
		data = request.POST
		serializer = ExampleModelSerializer(data,many=False)
		em = ExampleModel(data)
		em.save()
		return 1


""""
def turn_light_on():
def turn_light_off():
def



"""
