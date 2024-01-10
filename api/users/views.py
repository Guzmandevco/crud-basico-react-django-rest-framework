import datetime
from rest_framework import generics
from django.contrib.auth import login
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from todos.serializers import TodoSerializer
from users.serializers import UserSerializer, MyTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from todos.models import Todo
from .models import User



# Vista para iniciar sesión y obtener el token de acceso y actualización
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer  # Reemplaza con tu propio serializador si es necesario

# Vista para obtener un nuevo token de acceso utilizando el token de actualización
class MyTokenRefreshView(TokenRefreshView):
    pass  # No es necesario personalizar, pero puedes hacerlo si lo necesitas

# Ejemplo de una vista protegida que requiere autenticación mediante JWT
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            todos = Todo.objects.filter(user=request.user)
            serializer = TodoSerializer(todos, many=True)
            return Response({"todos": serializer.data}, status= status.HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response({"message": "No se encontrarón `Todos`"}, status= status.HTTP_404_NOT_FOUND)

#
##
class RegisterView(APIView):
  def post(self, request):
      serializer = UserSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      user = serializer.save()
      login(request, user)

      return Response({'user': serializer.data})

class LogoutView(APIView):
  def post(self, request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {'message': 'success'}
    #print(response.data['message'])
    return response





