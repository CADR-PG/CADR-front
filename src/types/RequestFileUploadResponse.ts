export default interface RequestFileUploadResponse {
  id: string;
  name: string;
  sizeInBytes: number;
  createdAt: Date;
  lastModifiedAt: Date;
  downloadUrl: string;
}
