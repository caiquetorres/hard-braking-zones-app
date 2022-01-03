export interface IUploadInteractor {
  uploadFile(file: File): Promise<void>;
}
