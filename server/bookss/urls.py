from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from .views import *

app_name = 'books'
urlpatterns = [
    path('create/', BooksCreatView.as_view()),
    path('list/', BooksListView.as_view()),
    path('list/filter/<slug:query>/', BooksFilterView.as_view()),
    path('list/genre/filter/<slug:query>/', GenreFilterView.as_view()),
    path('comment/create/', CommentCreateView.as_view()),
    path('comment/list/<int:pk>', CommentListView.as_view()),
    path('detail/<int:pk>', BooksDetailView.as_view()),
    path('genre/create/', GenreCreatView.as_view()),
    path('genre/list/', GenreListView.as_view()),
    path('user/books', ProfileArticleViews.as_view()),

]