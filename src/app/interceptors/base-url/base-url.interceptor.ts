import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

/**
 * Interceptor that adds in the request the base url value got from the
 * environment properties.
 */
@Injectable({ providedIn: 'root' })
export class BaseUrlInterceptor implements HttpInterceptor {
  /**
   * Static property that stores a value that can be used to disables the
   * base url when sending the request to the backend.
   */
  static readonly disableHeader: string = 'x-disabled-baseurl';

  /**
   * Method that adds the base url value in the request.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get(BaseUrlInterceptor.disableHeader)) {
      req = req.clone({
        headers: req.headers.delete(BaseUrlInterceptor.disableHeader),
      });
    } else {
      req = req.clone({
        url: `${environment.baseUrl}${req.url}`,
      });
    }
    return next.handle(req);
  }
}
