import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '../api/client';

function useGetProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
    refetchOnMount: 'always',
    staleTime: 5 * 60 * 1000,
  });
}

export default useGetProjects;
