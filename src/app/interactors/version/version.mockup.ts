import { Injectable } from '@angular/core';

import { IVersion } from '../../models/proxies/version.interface';

import { wait } from '../../utils/wait';

import { environment } from '../../../environments/environment';

import { IVersionInteractor } from './version.interactor.interface';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (environment.mocked) {
      return new VersionMockup();
    }
  },
})
export class VersionMockup implements IVersionInteractor {
  version: IVersion = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    value: {
      version: '1.1.0',
      url: 'https://google.com',
    },
  };

  async getOne() {
    await wait(200);
    return this.version;
  }
}
