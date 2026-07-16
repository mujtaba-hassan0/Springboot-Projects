import api from './api';

export const tailorService = {
  // 1. POST /api/tailor/generate -> Fires the Gemini tailoring pipeline
  async generateLetter(jobData) {
    // jobData object shape: { companyName, jobTitle, rawJobDescription }
    const response = await api.post('/tailor/generate', jobData);
    return response.data;
  },

  // 2. GET /api/tailor/history -> Pulls previous generations for this authenticated user
  async getHistory() {
    const response = await api.get('/tailor/history');
    return response.data;
  }
};