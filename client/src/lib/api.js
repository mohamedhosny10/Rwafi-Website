import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://www.faristest.somee.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  signup: (userData) => api.post('/api/auth/signup', userData),
  logout: () => api.post('/api/auth/logout'),
  getProfile: () => api.get('/api/auth/profile'),
};

// Services API calls
export const servicesAPI = {
  getAll: () => api.get('/api/services'),
  getById: (id) => api.get(`/api/services/${id}`),
  search: (query) => api.get(`/api/services/search?q=${encodeURIComponent(query)}`),
  request: (serviceRequest) => api.post('/api/services/request', serviceRequest),
};

// Search API calls
export const searchAPI = {
  search: (query, limit = 10) => api.get(`/api/search?q=${encodeURIComponent(query)}&limit=${limit}`),
  getSuggestions: (query) => api.get(`/api/search/suggestions?q=${encodeURIComponent(query)}`),
  getPopularTags: () => api.get('/api/search/popular-tags'),
};

export default api;
