import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserEmail } from '../api/client';

function useChangeUserEmail() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: changeUserEmail,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['me'] }),
  });
}

export default useChangeUserEmail;
