import { useQuery } from '@tanstack/react-query';
import { getWalletBalance } from '../api/client';
import useUserStore from '../stores/useUserStore';

function useWalletBalance() {
  const { isLoggedIn } = useUserStore();

  return useQuery({
    queryKey: ['shop', 'wallet'],
    queryFn: getWalletBalance,
    enabled: isLoggedIn,
    refetchOnMount: 'always',
  });
}

export default useWalletBalance;
