import { ErrorHandler, Injectable } from '@angular/core';

import { HelperService } from 'src/app/services/helper/helper.service';

import { environment } from 'src/environments/environment';

import * as Sentry from '@sentry/angular';
import { Integrations as TracingIntegrations } from '@sentry/tracing';

/**
 * A classe que representa o handler que lida com o envio do erro
 * para sentry.io
 */
@Injectable()
export class SentryErrorHandler extends ErrorHandler {
  constructor(private readonly helperService: HelperService) {
    super();

    if (!helperService.mobile) {
      return;
    }

    Sentry.init({
      environment: environment.sentry.environment,
      dsn: environment.sentry.dsn,
      release: environment.version,
      integrations: [new TracingIntegrations.BrowserTracing()],
      tracesSampleRate: 0.2,
    });
  }

  /**
   * Método que lida com o erro na aplicação
   *
   * @param error define um objeto com as informações do erro
   */
  handleError(error: any) {
    super.handleError(error);
    try {
      if (this.helperService.mobile) {
        Sentry.captureException(error.originalError || error);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
