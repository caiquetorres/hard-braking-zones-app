/* eslint-disable max-len */

import { Injectable } from '@angular/core';

import { IInfo } from '../../models/proxies/info.interface';

import { wait } from '../../utils/wait';

import { environment } from '../../../environments/environment';

import { IInfoInteractor } from './info.interactor.interface';

/**
 * Class that represents the interactor's mockup that handles the mocked
 * `info` data, allowing to work in the application in test mode.
 *
 * @see {@link IInfoInteractor}.
 *
 * @usageNotes This class cannot be passed as a dependency to a
 * `component` or `service`, it can only be passed to an `interactor`,
 * because when the application changes the mocked state from `false`
 * to `true` this class will not be instantiated.
 */
@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (environment.mocked) {
      return new InfoMockup();
    }
  },
})
export class InfoMockup implements IInfoInteractor {
  /**
   * Property that defines an array with some useful examples.
   */
  readonly infos: IInfo[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  /**
   * @inheritDoc
   */
  async getOne() {
    await wait(1000);
    return this.infos[0];
  }
}
