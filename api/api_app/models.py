from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=50, blank=False)
    description = models.TextField(max_length=100, blank=True)
    done = models.BooleanField(default=False)

    def __str__(self):
        return str(self.title)
    
    def recent_created(self):
        pass