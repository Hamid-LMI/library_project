// Configuration de l'API
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Service API
const api = {
  getBooks: () => fetch(`${API_BASE_URL}/books/`).then(res => res.json()),
  getAuthors: () => fetch(`${API_BASE_URL}/authors/`).then(res => res.json()),
  getAuthor: (id) => fetch(`${API_BASE_URL}/authors/${id}/`).then(res => res.json()),
  getGenres: () => fetch(`${API_BASE_URL}/genres/`).then(res => res.json()),
  createBook: (data) => fetch(`${API_BASE_URL}/books/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  createAuthor: (data) => fetch(`${API_BASE_URL}/authors/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  createGenre: (data) => fetch(`${API_BASE_URL}/genres/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())
};

export default api;