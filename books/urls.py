from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('api/authors/', views.AuthorListCreateView.as_view(), name='api_author_list'),
    path('api/authors/<int:pk>/', views.AuthorDetailView.as_view(), name='api_author_detail'),
    path('api/authors/<int:author_id>/books/', views.author_books, name='api_author_books'),
    path('api/books/', views.BookListCreateView.as_view(), name='api_book_list'),
    path('api/books/<int:pk>/', views.BookDetailView.as_view(), name='api_book_detail'),
    path('api/genres/', views.GenreListCreateView.as_view(), name='api_genre_list'),
]