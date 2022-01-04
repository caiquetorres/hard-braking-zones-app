/**
 * Interface that represents the object that interacts with the backend.
 */
export interface IUploadInteractor {
  /**
   * Method that uploads a file.
   *
   * @param file defines an object that represents the file.
   */
  uploadFile(file: File): Promise<void>;
}
