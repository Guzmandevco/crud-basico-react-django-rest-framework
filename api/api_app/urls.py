from django.urls import path
from .views import CreateTodo, LoadTodos, RemoveTodo, EditTodo, GetTodo

urlpatterns = [
  path('todos/create/', CreateTodo.as_view(), name='create-task'),
  path('todos/', LoadTodos.as_view(), name='load-tasks'),
  path('todos/delete/<int:pk>/', RemoveTodo.as_view(), name='remove-todo'),
  path('todos/edit/todo/<int:pk>/', EditTodo.as_view(), name='edit-todo'),
  path('todos/todo/<int:pk>/', GetTodo.as_view(), name='get-todo'),
  ]