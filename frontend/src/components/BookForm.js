import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BookForm = ({ onClose, onSuccess, onError, authors, genres, book = null }) => {
    const isEditing = book !== null;
    const [coverImage, setCoverImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        pages: '',
        genre_id: '',
        publication_date: '',
        author_id: ''
    });

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                pages: book.pages || '',
                genre_id: book.genre?.id || '',
                publication_date: book.publication_date || '',
                author_id: book.author?.id || '',
            });
        }
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            if (coverImage) {
                formDataToSend.append("cover_image", coverImage);
            }

            if (isEditing) {
                await api.updateBook(book.id, formDataToSend);
                onSuccess('Livre modifié avec succès!');
            } else {
                await api.createBook(formDataToSend);
                onSuccess('Livre créé avec succès!');
            }
        } catch (error) {
            console.error(`Erreur lors de la ${isEditing ? 'modification' : 'création'}:`, error);
            onError(`Erreur lors de la ${isEditing ? 'modification' : 'création'} du livre`);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
                                    name="author_id"
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Sélectionner un auteur</option>
                                    {authors.map(author => (
                                        <option key={author.id} value={author.id}>{author.full_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image de couverture</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="cover_image"
                                    accept="image/*"
                                    onChange={(e) => setCoverImage(e.target.files[0])}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Annuler
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {isEditing ? 'Modifier' : 'Créer'} le livre
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookForm;