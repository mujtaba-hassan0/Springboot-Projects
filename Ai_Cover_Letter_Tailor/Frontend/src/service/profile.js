import api from './api'; // Imports our configured Axios client with JWT interceptors

export const profileService = {
  // 1. GET /api/profile -> Fetches the current logged-in user's profile
  async getProfile() {
    const response = await api.get('/profile');
    return response.data;
  },

  // 2. POST /api/profile -> Creates or updates the profile details
  async saveProfile(profileData) {
    // profileData: { fullName, currentRole, skills }
    const response = await api.post('/profile', profileData);
    return response.data;
  }
};