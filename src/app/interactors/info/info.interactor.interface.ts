import { IInfo } from '../../models/proxies/info.interface';

/**
 * Interface that represents the object that interacts with the backend.
 */
export interface IInfoInteractor {
  /**
   * Method that returns the default entity.
   *
   * @returns an object that represents the default entity.
   */
  getOne(): Promise<IInfo>;
}
