import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { environment } from '../../../environments/environment';

import { IUploadInteractor } from './upload.interactor.interface';
import { UploadMuckup } from './upload.mockup';

/**
 * Interactor that consumes the backed project when dealing with
 * `upload`.
 *
 * @see {@link IUploadInteractor}.
 *
 * @usageNotes This class cannot be passed as a dependency to a component
 * directly, you must create a service, pass it as a dependency to the
 * service and pass the service as a dependency to a component.
 */
@Injectable({
  providedIn: 'root',
})
export class UploadInteractor implements IUploadInteractor {
  constructor(
    @Optional()
    private readonly uploadMockup: UploadMuckup,
    private readonly httpClient: HttpClient,
  ) {}

  /**
   * @inheritDoc
   */
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
