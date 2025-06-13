import axios from 'axios';
import loginData from '../types/LoginData';
import registerData from '../types/RegisterData';

const localApiUrl = '/api';
const productionApiUrl = ' https://api.cadr.studio';
export const apiUrl = import.meta.env.DEV ? localApiUrl : productionApiUrl;

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const userRegister = async (userData: registerData) => {
  return await apiClient.post('/users/register', userData);
};

export const userLogin = async (userData: loginData) => {
  return await apiClient.post('/users/login', userData);
};
