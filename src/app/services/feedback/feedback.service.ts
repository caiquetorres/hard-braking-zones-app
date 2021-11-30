import { Injectable } from '@angular/core';

import { ICreateFeedback } from '../../models/payloads/create-feedback.interface';

import { FeedbackInteractor } from '../../interactors/feedback/feedback.interactor';

/**
 * Service that deals with all the data related with the `feedback`
 * entity.
 */
@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private readonly feedbackInteractor: FeedbackInteractor) {}

  /**
   * Method that creates a new entity.
   *
   * @param body an object that contains the new entity data.
   * @returns an object that represents the created entity.
   */
  async createOne(body: ICreateFeedback) {
    return this.feedbackInteractor.createOne(body);
  }
}
