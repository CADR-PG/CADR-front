import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { changeUserEmail } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import ServerError from '../types/ServerError';
import useUserStore from '../stores/useUserStore';

function useChangeUserEmail() {
  const qc = useQueryClient();
  const { openSnackbar } = useSnackbarStore();
  const setUser = useUserStore.getState().setUser;

  return useMutation({
    mutationFn: changeUserEmail,
    onSuccess: (response) => {
      qc.invalidateQueries({ queryKey: ['me'] });
      const data = response.data;
      setUser({
        ...useUserStore.getState(),
        email: data.email,
      });
      openSnackbar('Email successfully changed!', 'success');
    },
    onError: (error: AxiosError<ServerError>) => {
      const errMsg = error?.response?.data.message || 'Email change error';
      openSnackbar(errMsg, 'error');
    },
  });
}

export default useChangeUserEmail;
