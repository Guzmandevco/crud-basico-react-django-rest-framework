from rest_framework import viewsets
from .serializer import TodoSerializer
from .models import Todo

class TaskView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()