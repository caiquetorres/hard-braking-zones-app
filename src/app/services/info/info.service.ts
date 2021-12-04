import { Injectable } from '@angular/core';

import { InfoInteractor } from '../../interactors/info/info.interactor';

/**
 * Service that deals with all the data related with the `info` entity.
 */
@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private readonly infoInteractor: InfoInteractor) {}

  /**
   * Method that returns the default entity.
   *
   * @returns an object that represents the default entity.
   */
  async getDefault() {
    return this.infoInteractor.getOne();
  }
}
