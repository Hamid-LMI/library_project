import React from 'react';

const Navigation = ({ currentView, onViewChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <span className="navbar-brand">📚 Bibliothèque</span>
        <div className="navbar-nav">
          <button 
            className={`nav-link btn btn-link ${currentView === 'books' ? 'active' : ''}`}
            onClick={() => onViewChange('books')}
          >
            Livres
          </button>
          <button 
            className={`nav-link btn btn-link ${currentView === 'authors' ? 'active' : ''}`}
            onClick={() => onViewChange('authors')}
          >
            Auteurs
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;