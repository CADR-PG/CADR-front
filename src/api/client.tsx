import axios from 'axios';
import { AxiosError } from 'axios';

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError)?.isAxiosError !== undefined;
};

import { useMutation } from '@tanstack/react-query';

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

export const usePostMutation = (url: string) => {
  return useMutation({ mutationFn: (data: unknown) => post(url, data) });
};

export const useCustomPostMutation = (
  url: string,
): {
  mutate: (
    data: unknown,
    callbacks?: { onSuccess?: () => void; onError?: (msg: string) => void },
  ) => void;
  isSubmitting: boolean;
} => {
  const mutation = usePostMutation(url);
  const mutate = (
    data: unknown,
    callbacks?: { onSuccess?: () => void; onError?: (msg: string) => void },
  ) => {
    mutation.mutate(data, {
      onSuccess: () => {
        if (callbacks?.onSuccess) {
          callbacks.onSuccess();
        }
      },
      onError: (error: unknown) => {
        const message =
          (isAxiosError(error) && (error.response?.data?.message as string)) ||
          (error instanceof Error && error.message) ||
          'Operation failed. Please try again.';
        if (callbacks?.onError) {
          callbacks.onError(message);
        }
      },
    });
  };

  return {
    mutate,
    isSubmitting: mutation.status === 'pending',
  };
};
