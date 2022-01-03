import { Injectable } from '@angular/core';

import { wait } from '../../utils/wait';

import { environment } from '../../../environments/environment';

import { IUploadInteractor } from './upload.interactor.interface';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (environment.mocked) {
      return new UploadMuckup();
    }
  },
})
export class UploadMuckup implements IUploadInteractor {
  async uploadFile(_: File) {
    await wait(1000);
  }
}
