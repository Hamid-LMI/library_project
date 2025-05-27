import React, { useState } from 'react';
import api from '../services/api';

const BookForm = ({ onClose, onSuccess, authors, genres }) => {
    const [formData, setFormData] = useState({
        title: '',
        pages: '',
        genre_id: '',
        publication_date: '',
        author_id: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.createBook({
                ...formData,
                pages: parseInt(formData.pages),
                author_id: parseInt(formData.author_id)
            });
            onClose();
            onSuccess();
            alert('Livre créé avec succès!');
        } catch (error) {
            console.error('Erreur lors de la création:', error);
            alert('Erreur lors de la création du livre');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAuthorSelect = (e) => {
        const selectedAuthors = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({
            ...formData,
            author_id: selectedAuthors
        });
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ajouter un livre</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Titre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre de pages</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="pages"
                                    value={formData.pages}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Genre</label>
                                <select
                                    className="form-select"
                                    name="genre_id"
                                    value={formData.genre_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Sélectionner un genre</option>
                                    {genres.map(genre => (
                                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date de publication</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="publication_date"
                                    value={formData.publication_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Auteur</label>
                                <select
                                    className="form-control"
                                    value={formData.author_id}
                                    onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
                                    required
                                >
                                    <option value="">Sélectionner un auteur</option>
                                    {authors.map(author => (
                                        <option key={author.id} value={author.id}>{author.full_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Annuler
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Créer le livre
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookForm;