import { useMutation } from '@tanstack/react-query';
import { userLogin } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useSnackbarStore } from '../stores/snackbarStore';
import ServerError from '../types/ServerError';

export default function useLogin() {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (error: AxiosError<ServerError>) => {
      const msg = error?.response?.data.message || 'Login failed';
      openSnackbar(msg, 'error');
    },
  });
}
