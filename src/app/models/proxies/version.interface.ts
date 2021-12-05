import { IBaseResponse } from './base-response.interface';

export interface IVersion extends IBaseResponse {
  value: {
    version: string;
    url: string;
  };
}
