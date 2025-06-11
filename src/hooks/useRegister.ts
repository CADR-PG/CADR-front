import { useMutation } from '@tanstack/react-query';
import { userRegister } from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function useRegister(email: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: userRegister,
    onSuccess: () => {
      navigate(`/email-confirmation?email=${email}`);
    },
  });
}
