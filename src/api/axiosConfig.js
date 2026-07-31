import axios from 'axios';

const getBaseUrl = () => {
  const rawUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'https://bakery-management-backend.onrender.com';
  const cleaned = rawUrl.replace(/\/+$/, '');
  return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;