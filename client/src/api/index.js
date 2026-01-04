import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173', // Adjust to your backend URL
});

export default api;
