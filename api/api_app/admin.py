from django.contrib import admin
from.models import User, Todo
#admin.site.register(CustomUser, UserAdmin)
admin.site.register(User)
admin.site.register(Todo)
