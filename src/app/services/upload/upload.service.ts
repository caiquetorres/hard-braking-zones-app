import { Injectable } from '@angular/core';

import { UploadInteractor } from '../../interactors/upload/upload.interactor';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly uploadInteractor: UploadInteractor) {}

  uploadFile(file: File) {
    return this.uploadInteractor.uploadFile(file);
  }
}
