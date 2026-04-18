import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deleteDirectory } from '../api/client';

export default function useDeleteDirectory() {
  const { uuid } = useParams<{ uuid: string }>();

  return useMutation({
    mutationFn: ({ directoryId }: { directoryId: string }) =>
      deleteDirectory(uuid!, directoryId),
  });
}
