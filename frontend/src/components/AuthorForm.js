import React, { useState } from 'react';
import api from '../services/api';

const AuthorForm = ({ onClose, onSuccess, onError, author = null }) => {
    const [formData, setFormData] = useState(author || {
        first_name: '',
        last_name: '',
        birth_date: ''
    });

    const isEditing = author && typeof author === 'object';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.updateAuthor(author.id, { ...formData });
                onSuccess("Auteur modifié avec succès !");
            } else {
                await api.createAuthor({ ...formData });
                onSuccess("Auteur créé avec succès !");
            }
        } catch (error) {
            console.error(`Erreur lors de la ${isEditing ? 'modification' : 'création'}:`, error);
            onError(`Erreur lors de la ${isEditing ? 'modification' : 'création'} de l'auteur`);
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
                        <h5 className="modal-title">Ajouter un auteur</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Prénom</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nom</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date de naissance</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="birth_date"
                                    value={formData.birth_date}
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
                                {isEditing ? 'Modifier' : 'Créer'} l'auteur
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthorForm