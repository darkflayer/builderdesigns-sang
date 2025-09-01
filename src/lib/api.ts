import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sang_token');
      if (token) {
        if (config.headers) {
          (config.headers as any).Authorization = `Bearer ${token}`;
        } else {
          (config as any).headers = { Authorization: `Bearer ${token}` };
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear auth data and redirect to login
      localStorage.removeItem('sang_token');
      localStorage.removeItem('sang_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
  },
  events: {
    list: '/api/events',
    details: (id: string) => `/api/events/${id}`,
    register: (id: string) => `/api/events/${id}/register`,
    attendees: (id: string) => `/api/events/${id}/attendees`,
    search: '/api/events/search',
  },
  user: {
    profile: '/api/user/profile',
    events: '/api/user/events',
    connections: '/api/user/connections',
    notifications: '/api/user/notifications',
  },
  qr: {
    generate: '/api/qr/generate',
    scan: '/api/qr/scan',
  },
};
