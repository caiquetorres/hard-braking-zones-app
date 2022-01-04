import { Injectable } from '@angular/core';

import { ICreateFeedback } from '../../models/payloads/create-feedback.interface';
import { IFeedback } from '../../models/proxies/feedback.interface';

import { wait } from '../../utils/wait';

import { environment } from '../../../environments/environment';

import { IFeedbackInteractor } from './feedback.interactor.interface';

/**
 * Class that represents the interactor's mockup that handles the mocked
 * `feedback` data, allowing to work in the application in test mode.
 *
 * @see {@link IFeedbackInteractor}.
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
      return new FeedbackMockup();
    }
  },
})
export class FeedbackMockup implements IFeedbackInteractor {
  /**
   * Property that defines an array with some useful examples.
   */
  private readonly feedbacks: IFeedback[] = [];

  /**
   * @inheritDoc
   */
  async createOne(body: ICreateFeedback) {
    const feedback: IFeedback = {
      id: this.feedbacks.length.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      ...body,
    };
    this.feedbacks.push(feedback);

    await wait(2000);

    return feedback;
  }
}
