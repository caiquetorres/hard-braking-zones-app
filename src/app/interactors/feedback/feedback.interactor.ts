import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { ICreateFeedback } from '../../models/payloads/create-feedback.interface';
import { IFeedback } from '../../models/proxies/feedback.interface';

import { environment } from '../../../environments/environment';

import { IFeedbackInteractor } from './feedback.interactor.interface';
import { FeedbackMockup } from './feedback.mockup';

/**
 * Interactor that allows interacting with the backend.
 */
@Injectable({
  providedIn: 'root',
})
export class FeedbackInteractor implements IFeedbackInteractor {
  constructor(
    @Optional()
    private readonly feedbackMockup: FeedbackMockup,
    private readonly httpClient: HttpClient,
  ) {}

  /**
   * Method that creates a new entity.
   *
   * @param body an object that contains the new entity data.
   * @returns an object that represents the created entity.
   */
  async createOne(body: ICreateFeedback) {
    if (environment.mocked) {
      return this.feedbackMockup.createOne(body);
    }
    return this.httpClient
      .post<IFeedback>(environment.routes.feedback, body)
      .toPromise();
  }
}
