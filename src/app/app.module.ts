import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SQLite } from '@ionic-enterprise/secure-storage/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { MenuModule } from './components/menu/menu.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SentryErrorHandler } from './errors/sentry/sentry.error-handler';
import { BaseUrlInterceptor } from './interceptors/base-url/base-url.interceptor';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      dbKey: '__dadb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
  ],
  providers: [
    SQLite,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
