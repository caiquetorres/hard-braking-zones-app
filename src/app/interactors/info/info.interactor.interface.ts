import { IInfo } from '../../models/proxies/info.interface';

/**
 * Interface that represents the object that represents the interactor.
 */
export interface IInfoInteractor {
  /**
   * Method that returns the default entity.
   *
   * @returns an object that represents the default entity.
   */
  getDefault(): Promise<IInfo>;
}
