from django.urls import path, include
from rest_framework import routers
from .views import TaskView

router = routers.DefaultRouter()
router.register(r'todo', TaskView, basename='todo')
urlpatterns = [
    path('api/v1/', include(router.urls))
]