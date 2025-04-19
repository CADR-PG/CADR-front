import axios from 'axios';

const API_BASE_URL = 'https://cadr-pg.github.io';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async (url: string) => {
  const response = await apiClient.get(url);
  return response.data;
};

export const post = async (url: string, data: unknown) => {
  const response = await apiClient.post(url, data);
  return response.data;
};

export const put = async (url: string, data: unknown) => {
  const response = await apiClient.put(url, data);
  return response.data;
};

export const del = async (url: string) => {
  const response = await apiClient.delete(url);
  return response.data;
};
