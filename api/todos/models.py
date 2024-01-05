from django.db import models
from users.models import User
from django.utils import timezone
class Todo(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    done = models.BooleanField(default=False)
    creation_date = models.DateTimeField(default=timezone.now)
    expiration_date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title} - {self.user.email}'



