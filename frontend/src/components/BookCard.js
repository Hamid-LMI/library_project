import React from 'react';

const BookCard = ({ book }) => (
    <div className="col-md-4 mb-4">
        <div className="card h-100 shadow-sm">
            {book.cover_image && (
                <img
                    src={book.cover_image}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: '300px', objectFit: 'cover' }}
                />
            )}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{book.title}</h5>
                <p className="card-text">
                    <strong>Genre:</strong> {book.genre?.name}<br />
                    <strong>Pages:</strong> {book.pages}<br />
                    <strong>Date de parution:</strong> {new Date(book.publication_date).toLocaleDateString('fr-FR')}
                </p>
                <div className="mt-auto">
                    <small className="text-muted">
                        <strong>Auteur:</strong> {book.author?.full_name}
                    </small>
                </div>
            </div>
        </div>
    </div>
);

export default BookCard;