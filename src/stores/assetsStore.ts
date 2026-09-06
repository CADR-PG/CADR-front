import { create } from 'zustand';
import { getProjectAssets } from '../api/client';
import type { AssetsDirectory, AssetsFile } from '../types/Assets';

function insertDirectory(
  tree: AssetsDirectory,
  parentId: string,
  newDirectory: AssetsDirectory,
): AssetsDirectory {
  if (tree.id === parentId) {
    return {
      ...tree,
      directories: [...(tree.directories ?? []), newDirectory],
    };
  }

  return {
    ...tree,
    directories:
      tree.directories?.map((directory) =>
        insertDirectory(directory, parentId, newDirectory),
      ) ?? null,
  };
}

function removeDirectoryById(
  tree: AssetsDirectory,
  directoryId: string,
): AssetsDirectory {
  return {
    ...tree,
    directories:
      tree.directories
        ?.filter((directory) => directory.id !== directoryId)
        .map((directory) => removeDirectoryById(directory, directoryId)) ??
      null,
  };
}

function insertFile(
  tree: AssetsDirectory,
  directoryId: string,
  newFile: AssetsFile,
): AssetsDirectory {
  if (tree.id === directoryId) {
    return { ...tree, files: [...(tree.files ?? []), newFile] };
  }

  return {
    ...tree,
    directories:
      tree.directories?.map((directory) =>
        insertFile(directory, directoryId, newFile),
      ) ?? null,
  };
}

function removeFileById(
  tree: AssetsDirectory,
  fileId: string,
): AssetsDirectory {
  return {
    ...tree,
    files: tree.files?.filter((file) => file.id !== fileId) ?? null,
    directories:
      tree.directories?.map((directory) => removeFileById(directory, fileId)) ??
      null,
  };
}

interface AssetsStore {
  assets: AssetsDirectory | null;
  fetch: (projectId: string) => Promise<void>;
  addDirectory: (parentId: string, newDirectory: AssetsDirectory) => void;
  removeDirectory: (directoryId: string) => void;
  addFile: (directoryId: string, newFile: AssetsFile) => void;
  removeFile: (fileId: string) => void;
}

export const useAssetsStore = create<AssetsStore>((set, get) => ({
  assets: null,
  fetch: async (projectId: string) => {
    const response = await getProjectAssets(projectId);
    set({ assets: response.data.assets });
  },
  addDirectory: (parentId, newDirectory) => {
    const { assets } = get();
    if (!assets) return;
    set({ assets: insertDirectory(assets, parentId, newDirectory) });
  },
  removeDirectory: (directoryId) => {
    const { assets } = get();
    if (!assets) return;
    set({ assets: removeDirectoryById(assets, directoryId) });
  },
  addFile: (directoryId, newFile) => {
    const { assets } = get();
    if (!assets) return;
    set({ assets: insertFile(assets, directoryId, newFile) });
  },
  removeFile: (fileId) => {
    const { assets } = get();
    if (!assets) return;
    set({ assets: removeFileById(assets, fileId) });
  },
}));
