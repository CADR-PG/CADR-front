import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import ChangePasswordData from '../types/ChangePasswordData';
import ServerError from '../types/ServerError';
import { changeUserPassword } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';

function useChangeUserPassword() {
  const { openSnackbar } = useSnackbarStore();

  return useMutation<
    AxiosResponse<unknown, unknown>,
    AxiosError<ServerError>,
    ChangePasswordData
  >({
    mutationFn: changeUserPassword,
    onSuccess: () => {
      openSnackbar('Password successfully changed!', 'success');
    },
    onError: (error: AxiosError<ServerError>) => {
      const msg = error?.response?.data?.message ?? 'Password change error';
      openSnackbar(msg, 'error');
    },
  });
}

export default useChangeUserPassword;
