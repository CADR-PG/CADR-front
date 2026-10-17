export default interface RequestFileUploadResponse {
  id: string;
  name: string;
  sizeInBytes: number;
  createdAt: string;
  lastModifiedAt: string | null;
  downloadUrl: string;
}
