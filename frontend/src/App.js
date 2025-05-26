import React, { useState, useEffect } from 'react';
import api from './services/api';
import Navigation from './components/Navigation';
import BookCard from './components/BookCard';
import AuthorCard from './components/AuthorCard';
import BookForm from './components/BookForm';
import './App.css';

export default function App() {
  const [currentView, setCurrentView] = useState('books');
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

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
        {/* Vue des livres */}
        {currentView === 'books' && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-primary">📖 Liste des Livres</h2>
              <button className="btn btn-success" onClick={() => setShowForm(true)}>
                ➕ Ajouter un livre
              </button>
            </div>
            <div className="row">
              {books.length > 0 ? (
                books.map(book => (
                  <BookCard key={book.id} book={book} />
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-info text-center">
                    Aucun livre trouvé. Utilisez l'interface d'administration Django pour ajouter des livres.
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Vue des auteurs */}
        {currentView === 'authors' && (
          <>
            <h2 className="text-success mb-4">👤 Liste des Auteurs</h2>
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

        {/* Détail d'un auteur */}
        {currentView === 'author-detail' && selectedAuthor && (
          <>
            <div className="mb-4">
              <button 
                className="btn btn-outline-secondary mb-3"
                onClick={() => setCurrentView('authors')}
              >
                ← Retour aux auteurs
              </button>
              <div className="card">
                <div className="card-header bg-success text-white">
                  <h3 className="mb-0">👤 {selectedAuthor.full_name}</h3>
                </div>
                <div className="card-body">
                  <p><strong>Date de naissance:</strong> {new Date(selectedAuthor.birth_date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>

            <h4 className="text-primary mb-3">📚 Livres de {selectedAuthor.full_name}</h4>
            <div className="row">
              {selectedAuthor.books && selectedAuthor.books.length > 0 ? (
                selectedAuthor.books.map(book => (
                  <BookCard key={book.id} book={book} />
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-warning text-center">
                    Cet auteur n'a pas encore de livres enregistrés.
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Formulaire modal */}
      {showForm && (
        <BookForm 
          onClose={() => setShowForm(false)}
          onSuccess={loadData}
          authors={authors}
          genres={genres}
        />
      )}
    </div>
  );
}