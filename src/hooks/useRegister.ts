import { useMutation } from '@tanstack/react-query';
import { userRegister } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useSnackbarStore } from '../stores/snackbarStore';
import ServerError from '../types/ServerError';

export default function useRegister(email: string) {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: userRegister,
    onSuccess: () => {
      navigate(`/email-confirmation?email=${email}`);
    },
    onError: (error: AxiosError<ServerError>) => {
      const msg = error?.response?.data.message || 'Registration failed';
      openSnackbar(msg, 'error');
    },
  });
}
