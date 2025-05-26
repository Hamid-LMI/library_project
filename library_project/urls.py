from django.contrib import admin
from django.urls import path, include

# urlpatterns = [
#     path("library/", include("library.urls")),
#     path('admin/', admin.site.urls)
# ]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('books.urls')),
    path('', include('books.urls')),
]