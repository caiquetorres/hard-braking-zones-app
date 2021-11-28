import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseUrlInterceptor implements HttpInterceptor {
  static readonly disableHeader: string = 'x-disabled-baseurl';

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
