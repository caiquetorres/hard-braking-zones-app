import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FeedbackService } from '../../services/feedback/feedback.service';
import { LoadingService } from '../../services/loading/loading.service';

/**
 * Component that represents the application feedback page.
 */
@Component({
  selector: 'hbz-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {
  /**
   * Property that defines an object that represents the new feedback
   * data.
   */
  formGroup: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private readonly loadingProvider: LoadingService,
    private readonly feedbackService: FeedbackService,
  ) {
    this.formGroup = formBuilder.group({
      text: ['', Validators.required],
    });
  }

  /**
   * Method that sends to the backend the new feedback entity.
   */
  async send() {
    await this.loadingProvider.present({ message: 'Enviando feedback...' });
    await this.feedbackService.createOne(this.formGroup.getRawValue());
    await this.loadingProvider.dismiss();
  }
}
