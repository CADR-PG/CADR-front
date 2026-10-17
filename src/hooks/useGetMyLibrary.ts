import { useQuery } from '@tanstack/react-query';
import { getMyLibrary } from '../api/client';
import useUserStore from '../stores/useUserStore';

function useGetMyLibrary() {
  const { isLoggedIn } = useUserStore();

  return useQuery({
    queryKey: ['shop', 'library'],
    queryFn: getMyLibrary,
    enabled: isLoggedIn,
    refetchOnMount: 'always',
  });
}

export default useGetMyLibrary;
