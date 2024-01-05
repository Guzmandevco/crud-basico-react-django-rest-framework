from django.contrib.auth.models import BaseUserManager, AbstractUser
from django.db import models
class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El campo de correo electrónico debe estar establecido')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class User(AbstractUser):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name']  # Agrega campos necesarios para crear usuario
    objects = CustomUserManager()
    
    def __str__(self):
<<<<<<< HEAD:api/api_app/models.py
        return f'{self.title} - {self.user.username}'
    
    def recent_created(self):
        pass


# Thanks for watching! 
=======
        return self.username

>>>>>>> auth:api/users/models.py
