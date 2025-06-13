import { useQuery } from '@tanstack/react-query';
import { loadScene } from '../api/client';

function useLoadScene(uuid: string) {
  return useQuery({
    queryKey: ['project'],
    queryFn: () => loadScene(uuid),
    retry: false,
    refetchOnMount: 'always',
    staleTime: Infinity,
  });
}

export default useLoadScene;
