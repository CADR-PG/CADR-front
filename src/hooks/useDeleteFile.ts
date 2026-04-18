import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deleteFile } from '../api/client';

export default function useDeleteFile() {
  const { uuid } = useParams<{ uuid: string }>();

  return useMutation({
    mutationFn: (fileId: string) => {
      return deleteFile(uuid!, fileId);
    },
  });
}
