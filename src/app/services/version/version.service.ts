import { Injectable } from '@angular/core';

import { VersionInteractor } from '../../interactors/version/version.interactor';

/**
 * Service that deals with all the data related with the `version` entity.
 */
@Injectable({
  providedIn: 'root',
})
export class VersionService {
  constructor(private readonly versionInteractor: VersionInteractor) {}

  /**
   * Method that returns the default entity.
   *
   * @returns an object that represents the default entity.
   */
  async getOne() {
    return this.versionInteractor.getOne();
  }
}
