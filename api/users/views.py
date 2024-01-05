import datetime
from rest_framework import generics
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from todos.serializers import TodoSerializer
from users.serializers import UserSerializer
from todos.models import Todo
from .models import User
import jwt

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


class RefreshAccesToken(APIView):
    """
    Return a new acces token
    """
        
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
        refresh_access_token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt', value= refresh_access_token , httponly=True)
        response.data = {'token':  refresh_access_token, 'user_id': account_user.id}
        print(response.data['token'], account_user)
        return response










