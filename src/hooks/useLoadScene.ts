import { useQuery } from '@tanstack/react-query';
import { loadScene } from '../api/client';

function useLoadScene(uuid: string, enabled = true) {
  return useQuery({
    queryKey: ['project', uuid],
    queryFn: () => loadScene(uuid),
    retry: false,
    refetchOnMount: 'always',
    staleTime: Infinity,
    enabled,
  });
}

export default useLoadScene;
