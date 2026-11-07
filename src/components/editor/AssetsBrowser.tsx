import { useEffect, useRef, useState } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { Menu, MenuItem } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import useAssets from '../../stores/useAssets';
import useCreateDirectory from '../../hooks/useCreateDirectory';
import useDeleteDirectory from '../../hooks/useDeleteDirectory';
import useRenameDirectory from '../../hooks/useRenameDirectory';
import useUploadFile from '../../hooks/useUploadFile';
import useDeleteFile from '../../hooks/useDeleteFile';
import useRenameFile from '../../hooks/useRenameFile';
import type { AssetsDirectory, AssetsFile } from '../../types/Assets';
import styles from '../../css/2-components/AssetsBrowser.module.scss';
import { AssetsContext, useAssetsContext } from '../../data/AssetsContext';
import { formatFileSize } from '../../utils/formatFileSize';
import { useDrag } from 'react-dnd';
import { DndTypes } from '../../types/DndTypes';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
import { useEditorContext } from '../../hooks/useEditorContext';
import Controls from '../../types/Controls';

interface FileItemProps {
  file: AssetsFile;
  directoryId: string;
  isRenaming: boolean;
  onContextMenu: (event: React.MouseEvent, target: ContextMenuTarget) => void;
  onStartRename: (id: string) => void;
  onRenameSubmit: (name: string) => void;
  onRenameCancel: () => void;
}

interface DirectoryItemProps {
  dir: AssetsDirectory;
  renamingId: string | null;
  expandedIds: Set<string>;
  onToggleOpen: (id: string) => void;
  onContextMenu: (event: React.MouseEvent, target: ContextMenuTarget) => void;
  onStartRename: (id: string) => void;
  onRenameDirectory: (id: string, name: string) => void;
  onRenameFile: (id: string, name: string) => void;
  onRenameCancel: () => void;
}

interface SelectedAsset {
  id: string;
  name: string;
  type: 'file' | 'directory';
}

type ContextMenuTarget =
  | { type: 'directory'; dir: AssetsDirectory }
  | { type: 'file'; file: AssetsFile }
  | { type: 'background'; directoryId: string; existingNames: string[] };

interface ContextMenuState {
  mouseX: number;
  mouseY: number;
  target: ContextMenuTarget;
}

function uniqueFolderName(existingNames: string[]) {
  const base = 'New Folder';
  if (!existingNames.includes(base)) return base;
  let i = 2;
  while (existingNames.includes(`${base} ${i}`)) i++;
  return `${base} ${i}`;
}

function RenameInput({
  initialName,
  onSubmit,
  onCancel,
}: {
  initialName: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initialName);

  const commit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== initialName) onSubmit(trimmed);
    else onCancel();
  };

  return (
    <input
      className={styles.renameInput}
      autoFocus
      value={value}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
          e.preventDefault();
          commit();
        }
        if (e.key === 'Escape') onCancel();
      }}
      onKeyUp={(e) => e.stopPropagation()}
    />
  );
}

function FileItem({
  file,
  directoryId,
  isRenaming,
  onContextMenu,
  onStartRename,
  onRenameSubmit,
  onRenameCancel,
}: FileItemProps) {
  const [, drag] = useDrag(() => ({
    type: DndTypes.FILE,
    item: { ...file, directoryId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const { selectedId, onSelect } = useAssetsContext();
  const isSelected = file.id === selectedId;

  return (
    <div
      ref={(node) => {
        drag(node);
      }}
      className={styles.row}
      onContextMenu={(e) => onContextMenu(e, { type: 'file', file })}
    >
      <span className={styles.iconSpacer} />
      <span
        className={`${styles.fileName} ${isSelected ? styles.selected : ''}`}
        onClick={() => onSelect(file.id, file.name, 'file')}
      >
        <InsertDriveFileIcon fontSize="small" />
        {isRenaming ? (
          <RenameInput
            initialName={file.name}
            onSubmit={onRenameSubmit}
            onCancel={onRenameCancel}
          />
        ) : (
          <span onDoubleClick={() => onStartRename(file.id)}>{file.name}</span>
        )}
        <span className={styles.fileSize}>
          ({formatFileSize(file.sizeInBytes)})
        </span>
      </span>
    </div>
  );
}

function DirectoryItem({
  dir,
  renamingId,
  expandedIds,
  onToggleOpen,
  onContextMenu,
  onStartRename,
  onRenameDirectory,
  onRenameFile,
  onRenameCancel,
}: DirectoryItemProps) {
  const { selectedId, onSelect } = useAssetsContext();
  const open = expandedIds.has(dir.id);
  const isSelected = dir.id === selectedId;
  const isRenaming = renamingId === dir.id;
  const hasChildren =
    (dir.directories?.length ?? 0) > 0 || (dir.files?.length ?? 0) > 0;

  return (
    <div>
      <div
        className={styles.row}
        onContextMenu={(e) => onContextMenu(e, { type: 'directory', dir })}
      >
        <span
          className={styles.toggleIcon}
          onClick={() => onToggleOpen(dir.id)}
        >
          {hasChildren ? (open ? '▾' : '▸') : ' '}
        </span>
        <span
          className={`${styles.dirName} ${isSelected ? styles.selected : ''}`}
          onClick={() => onSelect(dir.id, dir.name, 'directory')}
          onDoubleClick={() => onStartRename(dir.id)}
        >
          <FolderIcon fontSize="small" />
          {isRenaming ? (
            <RenameInput
              initialName={dir.name}
              onSubmit={(name) => onRenameDirectory(dir.id, name)}
              onCancel={onRenameCancel}
            />
          ) : (
            <span>{dir.name}</span>
          )}
        </span>
      </div>
      {open && (
        <div className={styles.children}>
          {dir.directories?.map((sub) => (
            <DirectoryItem
              key={sub.id}
              dir={sub}
              renamingId={renamingId}
              expandedIds={expandedIds}
              onToggleOpen={onToggleOpen}
              onContextMenu={onContextMenu}
              onStartRename={onStartRename}
              onRenameDirectory={onRenameDirectory}
              onRenameFile={onRenameFile}
              onRenameCancel={onRenameCancel}
            />
          ))}
          {dir.files?.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              directoryId={dir.id}
              isRenaming={renamingId === file.id}
              onContextMenu={onContextMenu}
              onStartRename={onStartRename}
              onRenameSubmit={(name) => onRenameFile(file.id, name)}
              onRenameCancel={onRenameCancel}
            />
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
  const deleteDirectory = useDeleteDirectory();
  const renameDirectory = useRenameDirectory();
  const deleteFile = useDeleteFile();
  const renameFile = useRenameFile();
  const { scenes } = useEditorSettingsStore();
  const { openSnackbar } = useSnackbarStore();
  const { focused, focus } = useEditorContext();
  const del = useKeyboardControls<Controls>((state) => state.del);
  const [selected, setSelected] = useState<SelectedAsset>({
    id: '',
    name: 'Assets',
    type: 'directory',
  });
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const uploadTargetRef = useRef<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectAsset = (
    id: string,
    name: string,
    type: 'file' | 'directory',
  ) => {
    setSelected({ id, name, type });
    // An asset is now the delete target - a stale entity focus shouldn't
    // also get deleted by useEditorKeys when Delete is pressed.
    focus(null);
  };

  const isFileOpenInEditor = (fileId: string) =>
    scenes.some((scene) => scene?.id === fileId);

  const deleteAsset = (type: 'file' | 'directory', id: string) => {
    if (type === 'directory') {
      deleteDirectory.mutate(id);
      return true;
    }
    if (isFileOpenInEditor(id)) {
      openSnackbar("You can't delete opened scene.", 'error');
      return false;
    }
    deleteFile.mutate(id);
    return true;
  };

  useEffect(() => {
    if (!del || focused || !assets) return;
    if (!selected.id || selected.id === assets.id) return;
    if (deleteAsset(selected.type, selected.id)) {
      setSelected({ id: '', name: 'Assets', type: 'directory' });
    }
    // Only react to the key edge, not to every state change it depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del]);

  if (!assets) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile.mutate({ file, directoryId: uploadTargetRef.current });
    e.target.value = '';
  };

  const openContextMenu = (
    event: React.MouseEvent,
    target: ContextMenuTarget,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (target.type === 'directory') {
      selectAsset(target.dir.id, target.dir.name, 'directory');
    } else if (target.type === 'file') {
      selectAsset(target.file.id, target.file.name, 'file');
    }
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      target,
    });
  };

  const closeContextMenu = () => setContextMenu(null);

  const toggleOpen = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandDirectory = (id: string) => {
    setExpandedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  };

  const handleNewFolder = () => {
    if (!contextMenu || contextMenu.target.type === 'file') return;
    const { target } = contextMenu;
    const parentDirectoryId =
      target.type === 'directory' ? target.dir.id : target.directoryId;
    const existingNames =
      target.type === 'directory'
        ? (target.dir.directories ?? []).map((d) => d.name)
        : target.existingNames;
    if (target.type === 'directory') expandDirectory(target.dir.id);
    createDir.mutate(
      {
        name: uniqueFolderName(existingNames),
        parentDirectoryId,
      },
      {
        onSuccess: (response) => setRenamingId(response.data.id),
      },
    );
    closeContextMenu();
  };

  const handleUploadFromMenu = () => {
    if (!contextMenu || contextMenu.target.type === 'file') return;
    const { target } = contextMenu;
    uploadTargetRef.current =
      target.type === 'directory' ? target.dir.id : target.directoryId;
    closeContextMenu();
    fileInputRef.current?.click();
  };

  const handleRenameFromMenu = () => {
    if (!contextMenu || contextMenu.target.type === 'background') return;
    const { target } = contextMenu;
    setRenamingId(target.type === 'directory' ? target.dir.id : target.file.id);
    closeContextMenu();
  };

  const handleDeleteFromMenu = () => {
    if (!contextMenu) return;
    const { target } = contextMenu;
    if (target.type === 'directory') deleteAsset('directory', target.dir.id);
    if (target.type === 'file') deleteAsset('file', target.file.id);
    closeContextMenu();
  };

  const handleRenameDirectory = (directoryId: string, name: string) => {
    renameDirectory.mutate({ directoryId, name });
    setRenamingId(null);
  };

  const handleRenameFile = (fileId: string, name: string) => {
    renameFile.mutate({ fileId, name });
    setRenamingId(null);
  };

  return (
    <div className={styles.container}>
      <AssetsContext.Provider
        value={{
          selectedId: selected.id,
          onSelect: selectAsset,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileChange}
        />
        <div
          className={styles.scrollArea}
          onContextMenu={(e) =>
            openContextMenu(e, {
              type: 'background',
              directoryId: assets.id,
              existingNames: (assets.directories ?? []).map((d) => d.name),
            })
          }
        >
          <div
            className={`${styles.rootDir} ${selected.id === assets.id ? styles.selected : ''}`}
            onClick={() => selectAsset(assets.id, 'Assets', 'directory')}
          >
            <FolderIcon fontSize="small" />
            <span>{assets.name}</span>
          </div>
          <div className={styles.tree}>
            {assets.directories?.map((dir: AssetsDirectory) => (
              <DirectoryItem
                key={dir.id}
                dir={dir}
                renamingId={renamingId}
                expandedIds={expandedIds}
                onToggleOpen={toggleOpen}
                onContextMenu={openContextMenu}
                onStartRename={setRenamingId}
                onRenameDirectory={handleRenameDirectory}
                onRenameFile={handleRenameFile}
                onRenameCancel={() => setRenamingId(null)}
              />
            ))}
            {assets.files?.map((file: AssetsFile) => (
              <FileItem
                key={file.id}
                file={file}
                directoryId={assets.id}
                isRenaming={renamingId === file.id}
                onContextMenu={openContextMenu}
                onStartRename={setRenamingId}
                onRenameSubmit={(name) => handleRenameFile(file.id, name)}
                onRenameCancel={() => setRenamingId(null)}
              />
            ))}
          </div>
        </div>
        <Menu
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
          open={contextMenu !== null}
          onClose={closeContextMenu}
          disableRestoreFocus
          disableEnforceFocus
        >
          {contextMenu?.target.type !== 'file' && (
            <MenuItem onClick={handleNewFolder}>
              <CreateNewFolderIcon fontSize="small" sx={{ mr: 1 }} />
              New Folder
            </MenuItem>
          )}
          {contextMenu?.target.type !== 'file' && (
            <MenuItem onClick={handleUploadFromMenu}>
              <UploadFileIcon fontSize="small" sx={{ mr: 1 }} />
              Upload File
            </MenuItem>
          )}
          {contextMenu?.target.type !== 'background' && (
            <MenuItem onClick={handleRenameFromMenu}>
              <DriveFileRenameOutlineIcon fontSize="small" sx={{ mr: 1 }} />
              Rename
            </MenuItem>
          )}
          {contextMenu?.target.type !== 'background' && (
            <MenuItem onClick={handleDeleteFromMenu}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          )}
        </Menu>
      </AssetsContext.Provider>
    </div>
  );
}
