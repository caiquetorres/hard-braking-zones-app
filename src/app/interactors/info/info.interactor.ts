import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { IInfo } from '../../models/proxies/info.interface';

import { environment } from '../../../environments/environment';

import { IInfoInteractor } from './info.interactor.interface';
import { InfoMockup } from './info.mockup';

/**
 * Interactor that allows interacting with the backend.
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
   * Method that returns the default entity.
   *
   * @returns an object that represents the default entity.
   */
  async getOne() {
    if (environment.mocked) {
      return this.infoMockup.getOne();
    }
    return this.httpClient.get<IInfo>(environment.routes.info).toPromise();
  }
}
