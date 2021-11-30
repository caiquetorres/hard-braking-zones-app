import { IBaseResponse } from './base-response.interface';

export interface IFeedback extends IBaseResponse {
  text: string;
}
