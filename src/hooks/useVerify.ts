import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import { AxiosError } from 'axios';
import ServerError from '../types/ServerError';

function useVerify() {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      navigate('/');
      openSnackbar('Successfully verified your email!', 'success');
    },
    onError: (error: AxiosError<ServerError>) => {
      if (error.response?.data?.message) {
        openSnackbar(error.response?.data?.message, 'error');
      } else {
        openSnackbar('Unknown error occured', 'error');
      }
    },
  });
}

export default useVerify;
