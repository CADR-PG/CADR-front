import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserInfo } from '../api/client';

function useChangeUserInfo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: changeUserInfo,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['me'] }),
  });
}

export default useChangeUserInfo;
