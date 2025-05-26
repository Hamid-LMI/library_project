from django.contrib import admin
from .models import Author, Book, Genre

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['last_name', 'first_name', 'birth_date']
    list_filter = ['birth_date']
    search_fields = ['first_name', 'last_name']
    date_hierarchy = 'birth_date'

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'genre', 'publication_date', 'pages']
    list_filter = ['genre', 'publication_date', 'author']
    search_fields = ['title', 'author__first_name', 'author__last_name']
    date_hierarchy = 'publication_date'