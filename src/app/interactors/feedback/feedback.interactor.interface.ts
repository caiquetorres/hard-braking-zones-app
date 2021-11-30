import { ICreateFeedback } from '../../models/payloads/create-feedback.interface';
import { IFeedback } from '../../models/proxies/feedback.interface';

/**
 * Interface that represents the object that interacts with the backend.
 */
export interface IFeedbackInteractor {
  /**
   * Method that creates a new entity.
   *
   * @param body an object that contains the new entity data.
   * @returns an object that represents the created entity.
   */
  createOne(body: ICreateFeedback): Promise<IFeedback>;
}
