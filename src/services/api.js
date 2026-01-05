import axios from 'axios';

const API_URL = 'https://695955d66c3282d9f1d72d0f.mockapi.io';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;