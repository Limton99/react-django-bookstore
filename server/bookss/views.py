from django.shortcuts import render
from rest_framework import generics
from .serializers import BookDetailsSerializer, BookListSerializer, BookGenreSerializer, CommentSerializer
from .models import Books, Genre, User, Comment
from rest_framework.permissions import IsAdminUser, AllowAny, SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q


class BooksCreatView(generics.CreateAPIView):
    serializer_class = BookDetailsSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class BooksListView(generics.ListAPIView):
    serializer_class = BookListSerializer
    queryset = Books.objects.all()

class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class BooksDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookDetailsSerializer
    queryset = Books.objects.all()


class GenreCreatView(generics.CreateAPIView):
    serializer_class = BookGenreSerializer


class GenreListView(generics.ListAPIView):
    serializer_class = BookGenreSerializer
    queryset = Genre.objects.all()

class ProfileArticleViews(APIView):
    serializer_class = BookListSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        books = Books.objects.filter(author=request.user.id).prefetch_related('genre')
        serializer = self.serializer_class(books, many=True)
        return Response(serializer.data)



class BooksFilterView(APIView):
    serializer_class = BookListSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request, query, format=None):
        books = Books.objects.filter(Q(title__icontains=query) | Q(description__icontains=query)).prefetch_related('genre')
        serializer = self.serializer_class(books, many=True)
        return Response(serializer.data)


class GenreFilterView(APIView):
    serializer_class = BookListSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request, query, format=None):
        books = Books.objects.filter(genre_id=query).prefetch_related('genre')
        serializer = self.serializer_class(books, many=True)
        return Response(serializer.data)

from django.shortcuts import render

# Create your views here.
