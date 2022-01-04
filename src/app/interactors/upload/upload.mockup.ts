import { Injectable } from '@angular/core';

import { wait } from '../../utils/wait';

import { environment } from '../../../environments/environment';

import { IUploadInteractor } from './upload.interactor.interface';

/**
 * Class that represents the interactor's mockup that handles the mocked
 * `upload`, allowing to work in the application in test mode.
 *
 * @see {@link IUploadInteractor}.
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
      return new UploadMuckup();
    }
  },
})
export class UploadMuckup implements IUploadInteractor {
  /**
   * @inheritDoc
   */
  async uploadFile(_: File) {
    await wait(1000);
  }
}
