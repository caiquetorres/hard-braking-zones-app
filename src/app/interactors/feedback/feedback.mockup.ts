import { Injectable } from '@angular/core';

import { ICreateFeedback } from '../../models/payloads/create-feedback.interface';
import { IFeedback } from '../../models/proxies/feedback.interface';

import { wait } from '../../utils/wait';

import { environment } from '../../../environments/environment';

import { IFeedbackInteractor } from './feedback.interactor.interface';

/**
 * Mockup that simulates the interaction with the backend.
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
  private readonly feedbacks: IFeedback[] = [];

  /**
   * Method that creates a new entity.
   *
   * @param body an object that contains the new entity data.
   * @returns an object that represents the created entity.
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
