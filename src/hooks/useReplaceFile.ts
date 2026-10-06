import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { requestFileUpload, uploadFileStorage } from '../api/client';
import { useAssetsStore } from '@/stores/assetsStore';

export default function useReplaceFile() {
  const { uuid } = useParams<{ uuid: string }>();
  const addFile = useAssetsStore((s) => s.addFile);
  const removeFile = useAssetsStore((s) => s.removeFile);

  return useMutation({
    mutationFn: async ({
      file,
      id,
      directoryId,
    }: {
      file: File;
      id: string;
      directoryId: string;
    }) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));

      const { data } = await requestFileUpload(uuid, id);
      console.log(data);
      await uploadFileStorage(data.downloadUrl, file);

      return { data, directoryId };
    },
    onSuccess({ data, directoryId }) {
      removeFile(data.id);
      const { downloadUrl: _downloadUrl, ...fileMeta } = {
        ...data,
        directoryId,
      };
      console.log('directory id:', directoryId);
      addFile(directoryId, fileMeta);
    },
    onError: (err) => console.error(err),
  });
}
