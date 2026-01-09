import { useQuery } from '@tanstack/react-query';
import { fetchLocationLogs } from '../api/client';

export default function useLocationLogs() {
  const query = useQuery({
    queryKey: ['locationLogs'],
    queryFn: fetchLocationLogs,
    staleTime: 1000 * 60,
  });
  return query;
}