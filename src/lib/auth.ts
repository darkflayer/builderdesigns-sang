import { api } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/api/auth/login', credentials);
    const { token, user } = response.data;
    
    localStorage.setItem('sang_token', token);
    localStorage.setItem('sang_user', JSON.stringify(user));
    
    return { token, user };
  },

  async register(credentials: RegisterCredentials) {
    const response = await api.post('/api/auth/register', credentials);
    const { token, user } = response.data;
    
    localStorage.setItem('sang_token', token);
    localStorage.setItem('sang_user', JSON.stringify(user));
    
    return { token, user };
  },

  async logout() {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('sang_token');
      localStorage.removeItem('sang_user');
    }
  },

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem('sang_user');
    return userData ? JSON.parse(userData) : null;
  },

  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    return localStorage.getItem('sang_token');
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  },
};