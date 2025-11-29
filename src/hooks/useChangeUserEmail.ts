import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { changeUserEmail } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import ServerError from '../types/ServerError';

function useChangeUserEmail() {
  const qc = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: changeUserEmail,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] });
      openSnackbar('Email successfully changed!', 'success');
    },
    onError: (error: AxiosError<ServerError>) => {
      const errMsg = error?.response?.data.message || 'Email change error';
      openSnackbar(errMsg, 'error');
    },
  });
}

export default useChangeUserEmail;
