export type AssetsDirectory = {
  id: string;
  name: string;
  createdAt: string;
  lastModifiedAt: string | null;
  directories: AssetsDirectory[] | null;
  files: AssetsFile[] | null;
};

export type AssetsFile = {
  id: string;
  name: string;
  sizeInBytes: number;
  createdAt: string;
  lastModifiedAt: string | null;
};

export type AssetsFileUploadReadModel = {
  id: string;
  name: string;
  sizeInBytes: number;
  createdAt: string;
  lastModifiedAt: string | null;
  uploadUrl: string;
};
