import React from 'react';
import BookCard from './BookCard';

const AuthorDetails = ({ author, onDeleteAuthorClick, onUpdateAuthorClick, onBack }) => (
    <>
        <div className="mb-4">
            <button
                className="btn btn-outline-secondary mb-3"
                onClick={() => onBack()}
            >
                ← Retour aux auteurs
            </button>
            <div className="card">
                <div className="card-header bg-success text-white">
                    <h3 className="mb-0">👤 {author.full_name}</h3>
                </div>
                <div className="card-body">
                    <p><strong>Date de naissance:</strong> {new Date(author.birth_date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="position-absolute top-0 end-0 p-2 d-flex gap-1">
                    <button
                        type="button"
                        className="btn btn-sm btn-light"
                        aria-label="Edit"
                        onClick={() => onUpdateAuthorClick(author)}
                    >
                        ✏️
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-light"
                        aria-label="Close"
                        onClick={() => onDeleteAuthorClick(author.id)}
                    >
                        ❌
                    </button>
                </div>
            </div>
        </div>
        <h4 className="text-primary mb-3">📚 Livres de {author.full_name}</h4>
        <div className="row">
            {author.books && author.books.length > 0 ? (
                author.books.map(book => (
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
);

export default AuthorDetails;