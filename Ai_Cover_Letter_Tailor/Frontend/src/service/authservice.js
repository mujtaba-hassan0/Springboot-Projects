import api from './api';

export const authService = {
  // 1. POST /api/auth/signup
  async register(username, password, fullName) {
    const response = await api.post('/auth/signup', {
      username,
      password,
      role: ["user"]
    });
    return response.data;
  },

  // 2. POST /api/auth/signin
  async login(username, password) {
    const response = await api.post('/auth/signin', {
      username,
      password,
    });
    
    // Save token and metadata upon successful verification
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
    }
    return response.data;
  },

  // 3. Simple logout action
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
};