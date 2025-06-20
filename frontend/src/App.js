import React, { useState, useEffect } from 'react';
import api from './services/api';
import Navigation from './components/Navigation';
import BookCard from './components/BookCard';
import AuthorCard from './components/AuthorCard';
import GenreCard from './components/GenreCard';
import AuthorForm from './components/AuthorForm';
import BookForm from './components/BookForm';
import GenreForm from './components/GenreForm';
import AuthorDetails from './components/AuthorDetails';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './App.css';

export default function App() {
  const [currentView, setCurrentView] = useState('books');
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [showGenreForm, setShowGenreForm] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const MySwal = withReactContent(Swal);

  const loadData = async () => {
    setLoading(true);
    try {
      const [booksData, authorsData, genresData] = await Promise.all([
        api.getBooks(),
        api.getAuthors(),
        api.getGenres()
      ]);
      setBooks(booksData.results || booksData);
      setAuthors(authorsData.results || authorsData);
      setGenres(genresData.results || genresData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
    setLoading(false);
  };

  const handleAuthorClick = async (authorId) => {
    setLoading(true);
    try {
      const authorData = await api.getAuthor(authorId);
      setSelectedAuthor(authorData);
      setCurrentView('author-detail');
    } catch (error) {
      console.error('Erreur lors du chargement de l\'auteur:', error);
    }
    setLoading(false);
  };

  const handleDeleteAuthorClick = async (authorId) => {
    const result = await MySwal.fire({
      title: 'Confirmer la suppression',
      text: "Êtes-vous sûr de vouloir supprimer cet élément ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
    if (result.isConfirmed) {
      try {
        const authorData = await api.deleteAuthor(authorId);
        loadData();
        setCurrentView("authors");

        setTimeout(() => {
          toast.success('Auteur supprimé avec Succès !');
        }, 200);
      } catch (error) {
        console.error('Erreur lors de la supression de l\'auteur:', error);
        toast.error('Erreur lors de la supression de l\'auteur.');
      }
    }
  };

  const handleUpdateAuthorClick = (author) => {
    setSelectedAuthor(author);
    setShowAuthorForm(true);
  };

  const handleDeleteGenreClick = async (genreId) => {
    const result = await MySwal.fire({
      title: 'Confirmer la suppression',
      text: "Êtes-vous sûr de vouloir supprimer cet élément ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
    if (result.isConfirmed) {
      try {
        const genreData = await api.deleteGenre(genreId);
        loadData();

        setTimeout(() => {
          toast.success('Genre supprimé avec Succès !');
        }, 200);
      } catch (error) {
        console.error('Erreur lors de la supression du genre:', error);
        toast.error('Erreur lors de la supression du genre.');
      }
    }
  };

  const handleUpdateGenreClick = (genre) => {
    setSelectedGenre(genre);
    setShowGenreForm(true);
  };

  const handleDeleteBookClick = async (bookId) => {
    const result = await MySwal.fire({
      title: 'Confirmer la suppression',
      text: "Êtes-vous sûr de vouloir supprimer cet élément ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
    if (result.isConfirmed) {
      try {
        const bookData = await api.deleteBook(bookId);
        loadData();

        setTimeout(() => {
          toast.success('Livre supprimé avec Succès !');
        }, 200);
      } catch (error) {
        console.error('Erreur lors de la supression du livre:', error);
        toast.error('Erreur lors de la supression du livre.');
      }
    }
  };

  const handleUpdateBookClick = (book) => {
    setSelectedBook(book);
    setShowBookForm(true);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedAuthor(null);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Navigation currentView={currentView} onViewChange={handleViewChange} />

      <div className="container">
        {/* Books view */}
        {currentView === 'books' && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-primary">📖 Liste des Livres</h2>
              <button className="btn btn-success" onClick={() => { setShowBookForm(true); setSelectedBook(null); }}>
                ➕ Ajouter un livre
              </button>
            </div>
            <div className="row">
              {books.length > 0 ? (
                books.map(book => (
                  <BookCard key={book.id} book={book} onDeleteBookClick={handleDeleteBookClick} onUpdateBookClick={handleUpdateBookClick} />
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-info text-center">
                    Aucun livre trouvé. Cliquez sur "Ajouter un livre" ou utilisez l'interface d'administration Django pour ajouter des livres.
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Authors view */}
        {currentView === 'authors' && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-success mb-4">👤 Liste des Auteurs</h2>
              <button className="btn btn-success" onClick={() => { setShowAuthorForm(true); setSelectedAuthor(null); }}>
                ➕ Ajouter un auteur
              </button>
            </div>
            <div className="row">
              {authors.length > 0 ? (
                authors.map(author => (
                  <AuthorCard key={author.id} author={author} onAuthorClick={handleAuthorClick} />
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-info text-center">
                    Aucun auteur trouvé. Utilisez l'interface d'administration Django pour ajouter des auteurs.
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Author details */}
        {currentView === 'author-detail' && selectedAuthor && (
          <AuthorDetails
            key={selectedAuthor.id}
            author={selectedAuthor}
            onDeleteAuthorClick={handleDeleteAuthorClick}
            onUpdateAuthorClick={handleUpdateAuthorClick}
            onBack={() => setCurrentView('authors')} />
        )}

        {/* Genres view */}
        {currentView === 'genres' && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-success mb-4"> 📖 Liste des genres</h2>
              <button className="btn btn-success" onClick={() => { setShowGenreForm(true); setSelectedGenre(null); }}>
                ➕ Ajouter un genre
              </button>
            </div>
            <div className="row">
              {genres.length > 0 ? (
                genres.map(genre => (
                  <GenreCard key={genre.id} genre={genre} onDeleteGenreClick={handleDeleteGenreClick} onUpdateGenreClick={handleUpdateGenreClick} />
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-info text-center">
                    Aucun genre trouvé. Cliquez sur "Ajouter un genre" ou utilisez l'interface d'administration Django pour ajouter des genres.
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal form : AuthorForm */}
      {showAuthorForm && (
        <AuthorForm
          author={selectedAuthor}
          onClose={() => setShowAuthorForm(false)}
          onSuccess={(message) => {
            setShowAuthorForm(false);
            loadData();

            // refresh only if existing author updated
            if (selectedAuthor?.id && currentView === 'author-detail') {
              handleAuthorClick(selectedAuthor.id);
            }

            if (message) {
              setTimeout(() => {
                toast.success(message);
              }, 200);
            }
          }}
          onError={(message) => toast.error(message)}
        />
      )}

      {/* Modal form : BookForm */}
      {showBookForm && (
        <BookForm
          book={selectedBook}
          onClose={() => setShowBookForm(false)}
          onSuccess={(message) => {
            setShowBookForm(false);
            loadData();

            if (message) {
              setTimeout(() => {
                toast.success(message);
              }, 200);
            }
          }}
          onError={(message) => toast.error(message)}
          authors={authors}
          genres={genres}
        />
      )}

      {/* Modal form : GenreForm */}
      {showGenreForm && (
        <GenreForm
          genre={selectedGenre}
          onClose={() => setShowGenreForm(false)}
          onSuccess={(message) => {
            setShowGenreForm(false);
            loadData();

            if (message) {
              setTimeout(() => {
                toast.success(message);
              }, 200);
            }
          }}
          onError={(message) => toast.error(message)}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>

  );
}