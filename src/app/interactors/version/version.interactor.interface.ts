import { IVersion } from '../../models/proxies/version.interface';

export interface IVersionInteractor {
  getOne(): Promise<IVersion>;
}
