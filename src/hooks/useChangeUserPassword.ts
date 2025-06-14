import { useMutation } from '@tanstack/react-query';
import { changeUserPassword } from '../api/client';

function useChangeUserPassword() {
  return useMutation({
    mutationFn: changeUserPassword,
  });
}

export default useChangeUserPassword;
