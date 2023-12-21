from django.urls import path
from .views import CreateTodo, LoadTodos, RemoveTodo, EditTodo, GetTodo, RegisterView, LoginView, UserView, LogoutView

urlpatterns = [
  path('todos/create/', CreateTodo.as_view()),
  path('todos/', LoadTodos.as_view(), name='load-tasks'),
  path('todos/delete/<int:pk>/', RemoveTodo.as_view(), name='remove-todo'),
  path('todos/edit/todo/<int:pk>/', EditTodo.as_view(), name='edit-todo'),
  path('todos/todo/<int:pk>/', GetTodo.as_view(), name='get-todo'),
  #user views
  path('users/register/', RegisterView.as_view(), name='register'),
  path('users/login/', LoginView.as_view(), name='login'),
  path('users/user/', UserView.as_view(), name='home-user'),
  path('users/logout/', LogoutView.as_view(), name='logout'),
  ]