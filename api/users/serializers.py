from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'name', 'username', 'email', 'password']
    extra_kwargs = {
      'password': {'write_only' : True}
  }
  def create(self, validated_data):
    password = validated_data.pop('password', None)
    instance = self.Meta.model(**validated_data)
    if password is not None:
      instance.set_password(password)
    instance.save()
    return instance

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Puedes personalizar la información que se incluirá en el token de acceso aquí
        data['username'] = self.user.username
        data['id'] = self.user.id
        # Añade cualquier otro campo que desees incluir en el token de acceso
        return data


