import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/client';

function useFetchUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
}

export default useFetchUser;
