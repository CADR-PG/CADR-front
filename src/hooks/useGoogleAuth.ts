import { useMutation } from '@tanstack/react-query';
import { googleAuth } from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function useGoogleAuth() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: googleAuth,
    onSuccess: () => {
      navigate('/dashboard');
    },
  });
}
