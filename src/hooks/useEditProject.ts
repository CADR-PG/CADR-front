import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyProject } from '../api/client';
import { useNavigate } from 'react-router-dom';

function useEditProject() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      uuid,
      data,
    }: {
      uuid: string;
      data: { name: string; description?: string };
    }) => modifyProject(uuid, { ...data, description: data.description ?? '' }),
    onSuccess: (_response, variables) => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      if (variables?.uuid) navigate('/dashboard');
    },
  });
}

export default useEditProject;
