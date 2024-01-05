from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)
    class Meta:
        model = Todo
        fields = '__all__'



