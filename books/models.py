from django.db import models
from django.urls import reverse

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Nom du genre")
    
    class Meta:
        verbose_name = "Genre"
        verbose_name_plural = "Genres"
        ordering = ['name']
    
    def __str__(self):
        return self.name

class Author(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, verbose_name="Nom")
    birth_date = models.DateField(verbose_name="Date de naissance")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['last_name', 'first_name']
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    def get_absolute_url(self):
        return reverse('author_detail', kwargs={'pk': self.pk})

class Book(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre")
    pages = models.PositiveIntegerField(verbose_name="Nombre de pages")
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, verbose_name="Genre")
    publication_date = models.DateField(verbose_name="Date de parution")
    cover_image = models.ImageField(upload_to='covers/', blank=True, null=True, verbose_name="Photo de couverture")
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books', verbose_name="Auteur")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Livre"
        verbose_name_plural = "Livres"
        ordering = ['-publication_date']
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('book_detail', kwargs={'pk': self.pk})
