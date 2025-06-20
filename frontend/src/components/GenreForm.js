import React, { useState } from 'react';
import api from '../services/api';

const GenreForm = ({ onClose, onSuccess, onError, genre = null }) => {
    const [formData, setFormData] = useState(genre || {name: '' });

    const isEditing = genre !== null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.updateGenre(genre.id, { ...formData });
                onSuccess('Genre modifié avec succès!');
            } else {
                await api.createGenre({ ...formData });
                onSuccess('Genre créé avec succès!');
            }
        } catch (error) {
            console.error(`Erreur lors de la ${isEditing ? 'modification' : 'création'}:`, error);
            onError(`Erreur lors de la ${isEditing ? 'modification' : 'création'} du genre`);
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
                        <h5 className="modal-title">Ajouter un genre</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Genre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Annuler
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {isEditing ? 'Modifier' : 'Créer'} le genre
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GenreForm