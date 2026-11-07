import { useQuery } from '@tanstack/react-query';
import { getMostPopularGames } from '../api/client';
import useUserStore from '../stores/useUserStore';

function useGetMostPopularGames() {
  const { isLoggedIn } = useUserStore();

  return useQuery({
    queryKey: ['shop', 'popular'],
    queryFn: getMostPopularGames,
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000,
  });
}

export default useGetMostPopularGames;
