import { Injectable } from '@angular/core';

import { UploadInteractor } from '../../interactors/upload/upload.interactor';

/**
 * Service that deals with all the data related with the `upload`.
 */
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly uploadInteractor: UploadInteractor) {}

  /**
   * Method that uploads a file.
   *
   * @param file defines an object that represents the file.
   */
  uploadFile(file: File) {
    return this.uploadInteractor.uploadFile(file);
  }
}
