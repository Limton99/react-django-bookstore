from datetime import datetime
from django.contrib.auth.models import User
from django.db import models
import time


def upload_article(instance, filename):
    lastDot = filename.rfind('.')
    extension= filename[lastDot:len(filename):1]
    return 'images/books/%s-%s%s' % (instance.title, time.time(), extension)

class Genre(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Books(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=5000)
    image = models.ImageField(upload_to=upload_article, blank=True, null=True)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    price = models.CharField(max_length=100)
    member = models.CharField(max_length=50)
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=50)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    isPopular = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title





class Comment(models.Model):
    book = models.ForeignKey(
        Books, on_delete=models.CASCADE, related_name='comments')
    name = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    email = models.EmailField()
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return 'Comment {} by {}'.format(self.body, self.name)
# Create your models here.
