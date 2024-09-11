from django.db import models
from django.contrib.auth.models import User

class Flashcard(models.Model):
    expression = models.CharField(max_length=200, null=False)
    meaning = models.CharField(max_length=200, null=False)
    example = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cards")

    def __str__(self):
        return str(self.pk)
