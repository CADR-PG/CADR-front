import { useQuery } from '@tanstack/react-query';
import { getGamesList } from '../api/client';
import useUserStore from '../stores/useUserStore';

function useGetGamesList() {
  const { isLoggedIn } = useUserStore();

  return useQuery({
    queryKey: ['shop', 'games'],
    queryFn: getGamesList,
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000,
  });
}

export default useGetGamesList;
