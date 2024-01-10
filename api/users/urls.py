from django.urls import path
from .views import (
RegisterView,
LogoutView,
MyTokenObtainPairView,
MyTokenRefreshView,
ProtectedView
)
urlpatterns = [
   # path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', MyTokenRefreshView.as_view(), name='refresh-token'),
    path('token/', MyTokenObtainPairView.as_view(), name='login'),
    path('users/register/', RegisterView.as_view(), name='register'),
    path('users/logout/', LogoutView.as_view(), name='logout'),
    path('users/user/', ProtectedView.as_view()),

]


