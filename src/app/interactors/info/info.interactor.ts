import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { IInfo } from '../../models/proxies/info.interface';

import { environment } from '../../../environments/environment';

import { IInfoInteractor } from './info.interactor.interface';
import { InfoMockup } from './info.mockup';

/**
 * Interactor that consumes the backed project when dealing with
 * `info` entities.
 *
 * @see {@link IInfoInteractor}.
 *
 * @usageNotes This class cannot be passed as a dependency to a component
 * directly, you must create a service, pass it as a dependency to the
 * service and pass the service as a dependency to a component.
 */
@Injectable({
  providedIn: 'root',
})
export class InfoInteractor implements IInfoInteractor {
  constructor(
    @Optional()
    private readonly infoMockup: InfoMockup,
    private readonly httpClient: HttpClient,
  ) {}

  /**
   * @inheritDoc
   */
  async getOne() {
    if (environment.mocked) {
      return this.infoMockup.getOne();
    }
    return this.httpClient.get<IInfo>(environment.routes.info).toPromise();
  }
}
