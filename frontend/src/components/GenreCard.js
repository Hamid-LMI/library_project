import React from 'react';

const GenreCard = ({ genre, onDeleteGenreClick, onUpdateGenreClick }) => (
    <div className="col-md-4 mb-4">
        <div className="card h-100 shadow-sm">
            <div className="card-body position-relative">
                <div className="position-absolute top-0 end-0 p-2 d-flex gap-1">
                    <button
                        type="button"
                        className="btn btn-sm btn-light"
                        aria-label="Edit"
                        onClick={() => onUpdateGenreClick(genre)}
                    >
                        ✏️
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-light"
                        aria-label="Close"
                        onClick={() => onDeleteGenreClick(genre.id)}
                    >
                        ❌
                    </button>
                </div>
                <h5 className="card-title text-primary mt-4">{genre.name}</h5>
            </div>
        </div>
    </div>
);

export default GenreCard;