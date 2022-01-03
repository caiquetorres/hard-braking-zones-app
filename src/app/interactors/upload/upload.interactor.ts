import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { environment } from '../../../environments/environment';

import { IUploadInteractor } from './upload.interactor.interface';
import { UploadMuckup } from './upload.mockup';

@Injectable({
  providedIn: 'root',
})
export class UploadInteractor implements IUploadInteractor {
  constructor(
    @Optional()
    private readonly uploadMockup: UploadMuckup,
    private readonly httpClient: HttpClient,
  ) {}

  uploadFile(file: File) {
    if (environment.mocked) {
      return this.uploadMockup.uploadFile(file);
    }

    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient
      .post<void>(environment.routes.upload, formData)
      .toPromise();
  }
}
