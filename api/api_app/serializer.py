from rest_framework import serializers
from .models import Todo, CustomUser
        
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = ['id', 'username', 'email']
    
class TodoSerializer(serializers.ModelSerializer):
   # user = UserSerializer(read_only=True)  
    class Meta:
      model = Todo
      exclude = ["user"]