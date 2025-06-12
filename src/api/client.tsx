import axios, { AxiosError } from 'axios';
import loginData from '../types/LoginData';
import registerData from '../types/RegisterData';
import verifyData from '../types/VerifyData';
import UserData from '../types/UserData';

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

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.status === 401) {
      const refreshResponse = await refreshToken();
      if (refreshResponse.status === 200) {
        return await apiClient(error.config!);
      }
    }
    return Promise.reject(error);
  });

export const userRegister = async (userData: registerData) => {
  return await apiClient.post('/users/register', userData);
};

export const userLogin = async (userData: loginData) => {
  return await apiClient.post('/users/login', userData);
};

export const resendEmail = async (email: string) => {
  return await apiClient.post(
    `/users/resend-email-confirmation?email=${email}`,
  );
};

export const verifyEmail = async (data: verifyData) => {
  return await apiClient.get(
    `/users/confirm-email?email=${data.email}&code=${data.code}`,
  );
};
export const fetchUser = async () => {
  return await apiClient.get<UserData>('/users/me');
}

export const logout = async () => {
  return await apiClient.post('/users/logout');
}

export const refreshToken = async () => {
  return await apiClient.post('/users/refresh');
}
