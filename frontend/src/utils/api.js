import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (name, email, password) =>
    api.post('/api/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/api/auth/login', { email, password }),
};

// Chat API
export const chatAPI = {
  newChat: (title) => api.post('/api/chat/new', { title }),
  sendMessage: (chatId, message) =>
    api.post('/api/chat/message', { chatId, message }),
  getHistory: () => api.get('/api/chat/history'),
  getChat: (chatId) => api.get(`/api/chat/${chatId}`),
  deleteChat: (chatId) => api.delete(`/api/chat/${chatId}`),
};

export default api;
