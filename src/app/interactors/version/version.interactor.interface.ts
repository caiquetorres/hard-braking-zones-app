import { IVersion } from '../../models/proxies/version.interface';

/**
 * Interface that represents the object that interacts with the backend.
 */
export interface IVersionInteractor {
  /**
   * Method that returns the default entity.
   *
   * @returns an object that represents the default entity.
   */
  getOne(): Promise<IVersion>;
}
