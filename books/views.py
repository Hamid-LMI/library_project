from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Author, Book, Genre
from .serializers import AuthorSerializer, BookSerializer, GenreSerializer, AuthorDetailSerializer

# API Views
class AuthorListCreateView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorDetailSerializer

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class GenreListCreateView(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

@api_view(['GET'])
def author_books(request, author_id):
    try:
        author = Author.objects.get(id=author_id)
        books = author.books.all().order_by('publication_date')
        serializer = BookSerializer(books, many=True)
        return Response({
            'author': AuthorSerializer(author).data,
            'books': serializer.data
        })
    except Author.DoesNotExist:
        return Response({'error': 'Author not found'}, status=status.HTTP_404_NOT_FOUND)