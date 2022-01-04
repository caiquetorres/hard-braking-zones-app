import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { IVersion } from '../../models/proxies/version.interface';

import { environment } from '../../../environments/environment';

import { IVersionInteractor } from './version.interactor.interface';
import { VersionMockup } from './version.mockup';

/**
 * Interactor that consumes the backed project when dealing with
 * `version` entities.
 *
 * @see {@link IVersionInteractor}.
 *
 * @usageNotes This class cannot be passed as a dependency to a component
 * directly, you must create a service, pass it as a dependency to the
 * service and pass the service as a dependency to a component.
 */
@Injectable({
  providedIn: 'root',
})
export class VersionInteractor implements IVersionInteractor {
  constructor(
    @Optional()
    private readonly versionMockup: VersionMockup,
    private readonly httpClient: HttpClient,
  ) {}

  /**
   * @inheritDoc
   */
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
