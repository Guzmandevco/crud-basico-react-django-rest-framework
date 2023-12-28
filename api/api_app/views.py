import datetime
from rest_framework import generics
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TodoSerializer, UserSerializer
from .models import Todo, User
import jwt


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
        todo.title = request.data['title']
        todo.done = request.data['done']
        todo.description = request.data['description']
        todo.save()
        return Response({'success': 'Todo updated successfully'})


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
    account_user = User.objects.filter(email= email).first()
    if account_user is None or not account_user.check_password(password):
      raise AuthenticationFailed("User data not found!")
    login(request, account_user)
    payload = {
      'id': account_user.id,
      'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
      'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    response = Response()
    response.set_cookie(key='jwt', value=token, httponly=True)
    response.data = {'token': token, 'user_id': account_user.id}
   # print(response.data['token'], account_user)
    return response
#
##
class RegisterView(APIView):
  def post(self, request):
      serializer = UserSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      user = serializer.save()
      login(request, user)
     
      return Response({'user': serializer.data})
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
    user = User.objects.get(pk=payload['id'])
    serializer = UserSerializer(user)
    queryset = Todo.objects.filter(user= payload['id'])
    todo_serializer = TodoSerializer(queryset, many=True)
    data = {
      'user': serializer.data,
      'todos': todo_serializer.data
    }
    #print(data['todos'])
    return Response(data)
    
class LogoutView(APIView):
  def post(self, request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {'message': 'success'}
    #print(response.data['message'])
    return response