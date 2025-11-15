import { useMutation } from '@tanstack/react-query';
import { resendEmail } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import { AxiosError } from 'axios';
import ServerError from '../types/ServerError';

export default function useResend() {
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: resendEmail,
    onSuccess: () => {
      openSnackbar('Resend link!', 'success');
    },
    onError: (error: AxiosError<ServerError>) => {
      if (error.response?.data.message) {
        openSnackbar(error.response?.data.message, 'error');
      } else {
        openSnackbar('Unknown error occured', 'error');
      }
    },
  });
}
