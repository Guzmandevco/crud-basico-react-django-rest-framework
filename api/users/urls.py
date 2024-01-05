from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView

urlpatterns = [
  #user views
  path('users/register/', RegisterView.as_view(), name='register'),
  path('users/login/', LoginView.as_view(), name='login'),
  path('users/user/', UserView.as_view(), name='home-user'),
  path('users/logout/', LogoutView.as_view(), name='logout'),
]
