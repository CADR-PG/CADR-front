import { useMutation } from '@tanstack/react-query';
import { userRegister } from '../api/client';

export default function useRegister() {
  return useMutation({
    mutationFn: userRegister,
  });
}
