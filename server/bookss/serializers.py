from rest_framework import serializers
from myauth.serializers import UserSerializer
from .models import Books, Genre, User, Comment


class BookGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name', )

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class BookDetailsSerializer(serializers.ModelSerializer):
    # author = UserSerializer(read_only=True)
    class Meta:
        model = Books
        fields = '__all__'


class BookListSerializer(serializers.ModelSerializer):
    genre = BookGenreSerializer(read_only=True)
    # author = UserSerializer(read_only=True)
    class Meta:
        model = Books
        fields = '__all__'




