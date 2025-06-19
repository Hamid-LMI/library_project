from rest_framework import serializers
from .models import Author, Book, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class AuthorSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Author
        fields = ['id', 'first_name', 'last_name', 'birth_date', 'full_name']
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(), 
        source='author',
        write_only=True
    )
    genre_id = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(), 
        source='genre', 
        write_only=True
    )
    
    class Meta:
        model = Book
        fields = ['id', 'title', 'pages', 'genre', 'genre_id', 'publication_date', 
                 'cover_image', 'author', 'author_id', 'created_at', 'updated_at']

class AuthorDetailSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Author
        fields = ['id', 'first_name', 'last_name', 'birth_date', 'full_name', 'books']
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    def get_books(self, obj):
        books = obj.books.all().order_by('publication_date')
        return BookSerializer(books, many=True, context=self.context).data
