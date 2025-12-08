import axios, { AxiosError } from 'axios';
import loginData from '../types/LoginData';
import registerData from '../types/RegisterData';
import verifyData from '../types/VerifyData';
import UserData from '../types/UserData';
import ChangeInfoData from '../types/ChangeInfoData';
import ChangeEmailData from '../types/ChangeEmailData';
import ChangePasswordData from '../types/ChangePasswordData';
import AddProjectData from '../types/AddProjectData';
import SaveSceneData from '../types/SaveSceneData';

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
  (response) => response,
  async (error: AxiosError) => {
    if (error.status === 401) {
      const refreshResponse = await refreshToken();
      if (refreshResponse.status === 200) {
        return await apiClient(error.config!);
      }
    }
    return Promise.reject(error);
  },
);

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
};

export const logout = async () => {
  return await apiClient.post('/users/logout');
};

export const refreshToken = async () => {
  return await apiClient.post('/users/refresh');
};

export const changeUserInfo = async (data: ChangeInfoData) =>
  await apiClient.put('/users/change-info', data);

export const getAllProjects = async () => {
  return await apiClient.get('/projects/projects');
};

export const changeUserEmail = async (data: ChangeEmailData) =>
  await apiClient.post('/users/change-email', data);

export const modifyProject = async (uuid: string, data: AddProjectData) => {
  return await apiClient.put(`/projects/modify-project/${uuid}`, data);
};

export const changeUserPassword = async (data: ChangePasswordData) =>
  await apiClient.post('/users/change-password', data);

export const addProject = async (data: AddProjectData) => {
  return await apiClient.post('/projects/add-project', data);
};

export const deleteProject = async (uuid: string) => {
  return await apiClient.post(`/projects/delete-project/${uuid}`);
};

export const saveScene = async (data: SaveSceneData) => {
  return await apiClient.post(`/projects/save-scene/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loadScene = async (uuid: string) => {
  return await apiClient.get<SaveSceneData>(`/projects/load-scene/${uuid}`);
};
