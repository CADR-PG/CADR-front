import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { registerFile, uploadFileStorage } from '../api/client';
import { useAssetsStore } from '../stores/assetsStore';

export default function useUploadFile() {
  const { uuid } = useParams<{ uuid: string }>();
  const addFile = useAssetsStore((s) => s.addFile);

  return useMutation({
    mutationFn: async ({
      file,
      directoryId,
    }: {
      file: File;
      directoryId: string;
    }) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));
      const { data } = await registerFile(uuid, file.name, directoryId, file.size);
      await uploadFileStorage(data.uploadUrl, file);
      return { data, directoryId };
    },
    onSuccess: ({ data, directoryId }) => {
      const { uploadUrl: _uploadUrl, ...fileMeta } = data;
      addFile(directoryId, fileMeta);
    },
    onError: (err) => console.error(err),
  });
}