import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../api/client';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';

function useLogout() {
  const navigate = useNavigate();
  const { logoutUser } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      logoutUser();
      navigate('/');
    },
  });
}

export default useLogout;
