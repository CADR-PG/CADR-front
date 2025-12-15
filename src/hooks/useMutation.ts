import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { deleteProject as apiDeleteProject } from '../api/client';

export default function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<unknown>, Error, string>({
    mutationFn: (uuid: string) => apiDeleteProject(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
