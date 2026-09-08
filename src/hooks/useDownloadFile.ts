import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { requestFileDownload } from '../api/client';

export default function useDownloadFile(fileId: string | undefined) {
  const { uuid } = useParams<{ uuid: string }>();

  return useQuery({
    queryKey: ['texture', fileId],
    queryFn: () => {
      if (!uuid || !fileId)
        return Promise.reject(
          new Error('Project uuid and fileId is required!'),
        );
      return requestFileDownload(uuid, fileId);
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(uuid && fileId),
  });
}
