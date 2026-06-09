import { useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import useAssets from '../../stores/useAssets';
import useCreateDirectory from '../../hooks/useCreateDirectory';
import useDeleteDirectory from '../../hooks/useDeleteDirectory';
import useUploadFile from '../../hooks/useUploadFile';
import useDeleteFile from '../../hooks/useDeleteFile';
import type { AssetsDirectory, AssetsFile } from '../../types/Assets';
import styles from '../../css/2-components/AssetsBrowser.module.scss';
import { AssetsContext, useAssetsContext } from '../../data/AssetsContext';

interface FileItemProps {
  file: AssetsFile;
}

interface DirectoryItemProps {
  dir: AssetsDirectory;
}

interface SelectedDirectory {
  id: string;
  name: string;
}

function FileItem({ file }: FileItemProps) {
  const { onDeleteFile } = useAssetsContext();
  return (
    <div className={styles.row}>
      <span className={styles.iconSpacer} />
      <span className={styles.fileName}>
        <InsertDriveFileIcon fontSize="small" />
        <span>{file.name}</span>
        <span className={styles.fileSize}>
          ({(file.sizeInBytes / 1024).toFixed(1)} KB)
        </span>
      </span>
      <IconButton size="small" onClick={() => onDeleteFile(file.id)}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

function DirectoryItem({ dir }: DirectoryItemProps) {
  const { selectedId, onDelete, onSelect } = useAssetsContext();
  const [open, setOpen] = useState(false);
  const isSelected = dir.id === selectedId;
  const hasChildren =
    (dir.directories?.length ?? 0) > 0 || (dir.files?.length ?? 0) > 0;

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.toggleIcon} onClick={() => setOpen(!open)}>
          {hasChildren ? (open ? '▾' : '▸') : ' '}
        </span>
        <span
          className={`${styles.dirName} ${isSelected ? styles.selected : ''}`}
          onClick={() => onSelect(dir.id, dir.name)}
        >
          <FolderIcon fontSize="small" />
          <span>{dir.name}</span>
        </span>
        <IconButton size="small" onClick={() => onDelete(dir.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      {open && (
        <div className={styles.children}>
          {dir.directories?.map((sub) => (
            <DirectoryItem key={sub.id} dir={sub} />
          ))}
          {dir.files?.map((file) => (
            <FileItem key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AssetsBrowser() {
  const { assets } = useAssets();
  const uploadFile = useUploadFile();
  const createDir = useCreateDirectory();
  const deleteDir = useDeleteDirectory();
  const deleteFile = useDeleteFile();
  const [newDirName, setNewDirName] = useState('');
  const [selectedDirectory, setSelectedDirectory] = useState<SelectedDirectory>({
    id: '',
    name: 'Assets',
  });

  if (!assets) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile.mutate({ file, directoryId: selectedDirectory.id || assets.id });
    e.target.value = '';
  };

  const handleFileDelete = (fileId: string) => {
    deleteFile.mutate(fileId);
  };

  const handleCreate = () => {
    if (!newDirName.trim()) return;
    createDir.mutate(
      { name: newDirName.trim(), parentDirectoryId: selectedDirectory.id || assets.id },
      { onSuccess: () => setNewDirName('') },
    );
  };

  const handleDelete = (directoryId: string) => {
    deleteDir.mutate( directoryId );
  };

  return (
    <div className={styles.container}>
      <AssetsContext.Provider
        value={{
          selectedId: selectedDirectory.id,
          onDelete: handleDelete,
          onDeleteFile: handleFileDelete,
          onSelect: (id, name) => setSelectedDirectory({ id, name }),
        }}
      >
        <div className={styles.scrollArea}>
          <div
            className={`${styles.rootDir} ${selectedDirectory.id === assets.id ? styles.selected : ''}`}
            onClick={() => setSelectedDirectory({ id: assets.id, name: 'Assets' })}
          >
            <FolderIcon fontSize="small" />
            <span>{assets.name}</span>
          </div>
          <div className={styles.tree}>
            {assets.directories?.map((dir: AssetsDirectory) => (
              <DirectoryItem key={dir.id} dir={dir} />
            ))}
            {assets.files?.map((file: AssetsFile) => (
              <FileItem key={file.id} file={file} />
            ))}
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.toolbarRow}>
            <TextField
              size="small"
              value={newDirName}
              onChange={(e) => setNewDirName(e.target.value)}
              placeholder="Directory name"
            />
            <Button size="small" onClick={handleCreate} disabled={createDir.isPending}>
              + Directory
            </Button>
          </div>
          <div className={styles.toolbarRow}>
            <span className={styles.uploadLabel}>
              Upload to: <FolderIcon fontSize="small" /> {selectedDirectory.name}
            </span>
          </div>
          <div className={styles.toolbarRow}>
            <Button
              component="label"
              size="small"
              disabled={uploadFile.isPending}
            >
              {uploadFile.isPending ? 'Uploading...' : 'Upload file'}
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </div>
        </div>
      </AssetsContext.Provider>
    </div>
  );
}