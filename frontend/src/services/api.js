import axios from 'axios';

// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Axios Configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Service API
const api = {
  // GET requests
  getBooks: () => axiosInstance.get('/books/').then(res => res.data),
  getAuthors: () => axiosInstance.get('/authors/').then(res => res.data),
  getAuthor: (id) => axiosInstance.get(`/authors/${id}/`).then(res => res.data),
  getGenres: () => axiosInstance.get('/genres/').then(res => res.data),

  // POST requests
  createBook: (data) => {
    // If data is a FormData (for files), we override the Content-Type
    const config = data instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    
    return axiosInstance.post('/books/', data, config).then(res => res.data);
  },
  
  createAuthor: (data) => axiosInstance.post('/authors/', data).then(res => res.data),
  createGenre: (data) => axiosInstance.post('/genres/', data).then(res => res.data),

  // PUT requests
  updateGenre: (id, data) => axiosInstance.put(`/genres/${id}/`, data).then(res => res.data),
  updateBook: (id, data) => {
    // If data is a FormData (for files), we override the Content-Type
    const config = data instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    axiosInstance.put(`/books/${id}/`, data, config).then(res => res.data)
  },
  updateAuthor: (id, data) => axiosInstance.put(`/authors/${id}/`, data).then(res => res.data),

  // DELETE requests
  deleteGenre: (id) => axiosInstance.delete(`/genres/${id}/`).then(res => res.data),
  deleteBook: (id) => axiosInstance.delete(`/books/${id}/`).then(res => res.data),
  deleteAuthor: (id) => axiosInstance.delete(`/authors/${id}/`).then(res => res.data),
};

export default api;