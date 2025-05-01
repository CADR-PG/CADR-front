import axios from 'axios';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const userRegister = async (userData: unknown) => {
  return await apiClient.post('/users/register', userData);
}

export const userLogin = async (userData: unknown) => {
  return await apiClient.post('/users/login', userData);
}
