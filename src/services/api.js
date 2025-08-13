import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add the dummy authentication header
    'X-Dummy-Auth': 'allowed', // As defined in the backend dummy auth middleware
  },
});

export default apiClient;