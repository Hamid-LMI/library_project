import React from 'react';

const AuthorCard = ({ author, onAuthorClick }) => (
  <div className="col-md-4 mb-4">
    <div className="card h-100 shadow-sm" style={{ cursor: 'pointer' }} onClick={() => onAuthorClick(author.id)}>
      <div className="card-body">
        <h5 className="card-title text-success">{author.full_name}</h5>
        <p className="card-text">
          <strong>Date de naissance:</strong> {new Date(author.birth_date).toLocaleDateString('fr-FR')}
        </p>
        <small className="text-muted">Cliquez pour voir les livres</small>
      </div>
    </div>
  </div>
);

export default AuthorCard;