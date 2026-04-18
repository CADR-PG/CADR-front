import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { createDirectory } from '../api/client';

export default function useCreateDirectory() {
  const { uuid } = useParams<{ uuid: string }>();

  return useMutation({
    mutationFn: ({
      name,
      parentDirectoryId,
    }: {
      name: string;
      parentDirectoryId: string;
    }) => createDirectory(uuid!, name, parentDirectoryId),
  });
}
