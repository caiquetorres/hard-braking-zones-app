import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { ICreateFeedback } from '../../models/payloads/create-feedback.interface';
import { IFeedback } from '../../models/proxies/feedback.interface';

import { environment } from '../../../environments/environment';

import { IFeedbackInteractor } from './feedback.interactor.interface';
import { FeedbackMockup } from './feedback.mockup';

/**
 * Interactor that consumes the backed project when dealing with
 * `feedback` entities.
 *
 * @see {@link IFeedbackInteractor}.
 *
 * @usageNotes This class cannot be passed as a dependency to a component
 * directly, you must create a service, pass it as a dependency to the
 * service and pass the service as a dependency to a component.
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
   * @inheritDoc
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
