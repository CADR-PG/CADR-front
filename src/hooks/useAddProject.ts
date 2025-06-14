import { useMutation } from '@tanstack/react-query';
import { addProject } from '../api/client';
import { useNavigate } from 'react-router-dom';

function useAddProject() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addProject,
    onSuccess: (response) => {
      navigate(`/editor/${response.data.id}`);
    },
  });
}

export default useAddProject;
