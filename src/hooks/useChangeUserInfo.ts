import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { changeUserInfo } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import ServerError from '../types/ServerError';
import useUserStore from '../stores/useUserStore';

function useChangeUserInfo() {
  const qc = useQueryClient();
  const { openSnackbar } = useSnackbarStore();
  const setUser = useUserStore.getState().setUser;

  return useMutation({
    mutationFn: changeUserInfo,
    onSuccess: (response) => {
      qc.invalidateQueries({ queryKey: ['me'] });
      const data = response.data;
      setUser({
        ...useUserStore.getState(),
        firstName: data.firstName,
        lastName: data.lastName,
      });
      openSnackbar('Data changed successfully', 'success');
    },
    onError: (error: AxiosError<ServerError>) => {
      const errMsg = error?.response?.data.message || 'Data change error';
      openSnackbar(errMsg, 'error');
    },
  });
}

export default useChangeUserInfo;
