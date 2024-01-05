import datetime
from rest_framework import generics
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TodoSerializer
from users.serializers import UserSerializer
from users.models import User
from .models import Todo



class CreateTodo(APIView):
    def post(self, request, *args, **kwargs):
        # Accede al usuario que tiene la sesión iniciada
        user_id = int(self.request.data['user'])
        user = User.objects.get(pk=user_id)
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            try:
                todo = Todo.objects.get(title=request.data['title'], user=user)
                raise ValueError(f"Todo {request.data['title']} already exists for this user")
            except Todo.DoesNotExist:
                # Asigna el usuario actual a la tarea antes de guardarla
                serializer.save(user=user)
                return Response({'data': 'any'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoadTodos(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class RemoveTodo(generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def delete(self, request, *args, **kwargs):
      return self.destroy(request, *args, **kwargs)

class EditTodo(APIView):
    def put(self, request, *args, **kwargs):
        todo_id = kwargs.get('pk')
        try:
            todo = Todo.objects.get(pk=todo_id)
        except Todo.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
        return Response({'success': 'Todo updated successfully'})


class GetTodo(APIView):
    def get(self, request, **kwargs):
        try:
            todo = Todo.objects.get(pk=kwargs['pk'])
            serializer = TodoSerializer(todo, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=HTTP_404_NOT_FOUND)
