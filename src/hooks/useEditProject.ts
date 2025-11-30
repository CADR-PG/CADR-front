import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyProject } from '../api/client';

function useEditProject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      uuid,
      data,
    }: {
      uuid: string;
      data: { name: string; description?: string };
    }) => modifyProject(uuid, { ...data, description: data.description ?? '' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export default useEditProject;
