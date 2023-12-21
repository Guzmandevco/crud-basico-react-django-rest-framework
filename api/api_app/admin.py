from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Todo

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active')
    # Otros ajustes del admin
    # ...

#admin.site.register(CustomUser, UserAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Todo)
