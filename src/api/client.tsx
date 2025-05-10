import axios from 'axios';
import loginData from '../types/LoginData';
import registerData from '../types/RegisterData';

//const API_BASE_URL = ' https://cadr-api.azurewebsites.net';
const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

export const userRegister = async (userData: registerData) => {
  return await apiClient.post('/users/register', userData);
};

export const userLogin = async (userData: loginData) => {
  return await apiClient.post('/users/login', userData);
};
