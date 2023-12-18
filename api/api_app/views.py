from rest_framework import generics
from rest_framework.response import Response
from .serializer import TodoSerializer
from .models import Todo

class CreateTodo(generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class LoadTodos(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class RemoveTodo(generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
    def delete(self, request, *args, **kwargs):
      return self.destroy(request, *args, **kwargs)

class EditTodo(generics.UpdateAPIView):  # Use UpdateAPIView for updating
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
    def put(self, request, *args, **kwargs):
      return self.update(request, *args, **kwargs)


class GetTodo(generics.ListCreateAPIView):  # Use ListCreateAPIView for both list and create
    def perform_create(self, serializer):
        print(self.request.data)
        serializer.save()
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
