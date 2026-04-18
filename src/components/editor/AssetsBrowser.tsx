import useAssets from '../../hooks/useAssets';
import useCreateDirectory from '../../hooks/useCreateDirectory';
import useDeleteDirectory from '../../hooks/useDeleteDirectory';
import { useState } from 'react';
import useUploadFile from '../../hooks/useUploadFile';
import { AssetsDirectory, AssetsFile } from '../../api/client';
import useDeleteFile from '../../hooks/useDeleteFile';

function FileItem({
  file,
  onDelete,
}: {
  file: AssetsFile;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 0',
      }}
    >
      <span style={{ width: 12, flexShrink: 0 }} />
      <span style={{ flex: 1 }}>
        📄{file.name}{' '}
        <span style={{ color: '#999', fontSize: 11 }}>
          ({(file.sizeInBytes / 1024).toFixed(1)} KB)
        </span>
      </span>
      <button
        onClick={() => onDelete(file.id)}
        style={{
          fontSize: 10,
          padding: '1px 4px',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        🗑
      </button>
    </div>
  );
}

function DirectoryItem({
  dir,
  onDelete,
  onDeleteFile,
  onSelect,
  selectedId,
}: {
  dir: AssetsDirectory;
  onDelete: (id: string) => void;
  onSelect: (id: string, name: string) => void;
  onDeleteFile: (id: string) => void;
  selectedId: string;
}) {
  const [open, setOpen] = useState(false);
  const isSelected = dir.id === selectedId;
  const hasChildren =
    (dir.directories?.length ?? 0) > 0 || (dir.files?.length ?? 0) > 0;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '2px 0',
        }}
      >
        <span
          onClick={() => setOpen(!open)}
          style={{
            cursor: 'pointer',
            width: 12,
            flexShrink: 0,
            userSelect: 'none',
          }}
        >
          {hasChildren ? (open ? '▾' : '▸') : ' '}
        </span>
        <span
          onClick={() => onSelect(dir.id, dir.name)}
          style={{
            flex: 1,
            cursor: 'pointer',
            backgroundColor: isSelected ? '#d0e8ff' : 'transparent',
            borderRadius: 3,
            padding: '1px 4px',
          }}
        >
          📁 {dir.name}
        </span>
        <button
          onClick={() => onDelete(dir.id)}
          style={{ fontSize: 10, padding: '1px 4px', cursor: 'pointer' }}
        >
          🗑
        </button>
      </div>
      {open && (
        <div style={{ paddingLeft: 16 }}>
          {dir.directories?.map((sub) => (
            <DirectoryItem
              key={sub.id}
              dir={sub}
              onDelete={onDelete}
              onDeleteFile={onDeleteFile}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
          {dir.files?.map((file) => (
            <FileItem key={file.id} file={file} onDelete={onDeleteFile} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AssetsBrowser() {
  const { assets, refetch } = useAssets();
  const uploadFile = useUploadFile();
  const createDir = useCreateDirectory();
  const deleteDir = useDeleteDirectory();
  const deleteFile = useDeleteFile();
  const [newDirName, setNewDirName] = useState('');
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<string>('');
  const [selectedDirectoryName, setSelectedDirectoryName] =
    useState<string>('Assets');

  if (!assets) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile.mutate(
      { file, directoryId: selectedDirectoryId || assets.id },
      {
        onSuccess: () => refetch(),
        onError: (err) => console.log(err),
      },
    );
    e.target.value = '';
  };

  const handleFileDelete = (fileId: string) => {
    console.log('usuwam plik:', fileId);
    deleteFile.mutate(fileId, {
      onSuccess: () => refetch(),
      onError: (err) => console.log(err),
    });
  };

  const handleCreate = () => {
    if (!newDirName.trim()) return;
    createDir.mutate(
      { name: newDirName.trim(), parentDirectoryId: assets.id },
      {
        onSuccess: () => {
          setNewDirName('');
          refetch();
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };

  const handleDelete = (directoryId: string) => {
    deleteDir.mutate(
      { directoryId },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (err) => console.log(err),
      },
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        fontSize: 13,
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
        <div
          onClick={() => {
            setSelectedDirectoryId(assets.id);
            setSelectedDirectoryName('Assets');
          }}
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor:
              selectedDirectoryId === assets.id ? '#d0e8ff' : 'transparent',
            borderRadius: 3,
            padding: '2px 4px',
            display: 'inline-block',
          }}
        >
          📂 {assets.name}
        </div>
        <div style={{ paddingLeft: 8, marginTop: 4 }}>
          {assets.directories?.map((dir) => (
            <DirectoryItem
              key={dir.id}
              dir={dir}
              onDelete={handleDelete}
              onDeleteFile={handleFileDelete}
              onSelect={(id, name) => {
                setSelectedDirectoryId(id);
                setSelectedDirectoryName(name);
              }}
              selectedId={selectedDirectoryId}
            />
          ))}
          {assets.files?.map((file) => (
            <FileItem key={file.id} file={file} onDelete={handleFileDelete} />
          ))}
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid #ddd',
          padding: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div style={{ display: 'flex', gap: 4 }}>
          <input
            type="text"
            value={newDirName}
            onChange={(e) => setNewDirName(e.target.value)}
            placeholder="Nazwa katalogu"
          />
          <button onClick={handleCreate} disabled={createDir.isPending}>
            + Katalog
          </button>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#666' }}>
            Upload do: 📂 {selectedDirectoryName}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={uploadFile.isPending}
          />
          {uploadFile.isPending && <span>Wgrywanie...</span>}
        </div>
      </div>
    </div>
  );
}
