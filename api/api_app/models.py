from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.db import models

'''
`User` model
'''

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El campo Email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    # Agrega los campos personalizados que necesites
    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length= 50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    username = models.CharField(max_length=30, unique=True)
    objects = CustomUserManager()

    # Agrega cualquier otro método o propiedad personalizada que necesites

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = []  # Puedes añadir campos adicionales aquí si es necesario


class Todo(models.Model):
    title = models.CharField(max_length=50, blank=False)
    description = models.TextField(max_length=100, blank=True)
    done = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.title)
    
    def recent_created(self):
        pass