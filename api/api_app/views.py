import datetime
from rest_framework import generics
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import TodoSerializer, UserSerializer
from .models import Todo, CustomUser
import jwt

class CreateTodo(generics.CreateAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    user = CustomUser.objects.get(pk=2)

    def perform_create(self, serializer):
        print(self.request.data)
        todo = Todo.objects.filter(title=self.request.data['title'])
        if todo:
          raise ValueError(f"Todo {self.request.data['title']} already exists")
        # Asigna el usuario actual a la tarea antes de guardarla
        serializer.save(user=self.user)
        
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


class GetTodo(APIView):
    def get(self, request, **kwargs):
        try:
            todo = Todo.objects.get(pk=kwargs['pk'])
            data = {
                'title': todo.title,
                'description': todo.description,
                'done': todo.done
            }
            return Response(data)
        except Todo.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=404)
#
##
'''
Login view
return => `jwt` 
set => cookie session
'''
class LoginView(APIView):
  def post(self, request):
    email = request.data['email']
    password = request.data['password']
    account_user = CustomUser.objects.filter(email= email).first()
    if account_user is None or not account_user.check_password(password):
      raise AuthenticationFailed("User data not found!")
    
    payload = {
      'id': account_user.id,
      'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
      'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    response = Response()
    response.set_cookie(key='jwt', value=token, httponly=True)
    response.data = {'token': token}
    print(response.data['token'], account_user)
    return response
#
##
class RegisterView(APIView):
  def post(self, request):
    serializer = UserSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
#
##
class UserView(APIView):
  def get(self, request):
    token = request.COOKIES.get('jwt')
    if not token:
      raise AuthenticationFailed('UnAuthenticated!')
    try:
      payload = jwt.decode(token, 'secret', algorithms= ['HS256'])
    except jwt.ExpiredSignatureError:
      raise AuthenticationFailed('Token expired!')
    user = CustomUser.objects.get(pk=payload['id'])
    serializer = UserSerializer(user)
    queryset = Todo.objects.filter(user= payload['id'])
    todo_serializer = TodoSerializer(queryset, many=True)
    data = {
      'user': serializer.data,
      'todos': todo_serializer.data
    }
    print(data['todos'])
    return Response(data)
    
class LogoutView(APIView):
  def post(self, request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {'message': 'success'}
    print(response.data['message'])
    return response