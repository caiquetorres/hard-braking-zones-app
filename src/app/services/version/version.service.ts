import { Injectable } from '@angular/core';

import { VersionInteractor } from '../../interactors/version/version.interactor';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  constructor(private readonly versionInteractor: VersionInteractor) {}

  async getOne() {
    return this.versionInteractor.getOne();
  }
}
