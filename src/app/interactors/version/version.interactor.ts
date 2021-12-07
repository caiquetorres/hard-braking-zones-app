import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { IVersion } from '../../models/proxies/version.interface';

import { environment } from '../../../environments/environment';

import { IVersionInteractor } from './version.interactor.interface';
import { VersionMockup } from './version.mockup';

@Injectable({
  providedIn: 'root',
})
export class VersionInteractor implements IVersionInteractor {
  constructor(
    @Optional()
    private readonly versionMockup: VersionMockup,
    private readonly httpClient: HttpClient,
  ) {}

  async getOne() {
    if (environment.mocked) {
      return this.versionMockup.getOne();
    }
    return await this.httpClient
      .get<IVersion>(environment.routes.version)
      .toPromise()
      .then<IVersion>((res) => {
        res.value = JSON.parse(res.value as unknown as string);
        return res;
      });
  }
}
