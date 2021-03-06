import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

/**
 * Service that deals with network connection.
 */
@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  /**
   * Property that defines an object that informs if the application is
   * connected with the internet.
   */
  readonly connected$ = new BehaviorSubject(true);

  constructor() {
    this.init();

    Network.addListener('networkStatusChange', (status) => {
      this.connected$.next(status.connected);
    });
  }

  /**
   * Method that initializes the `connected$` property.
   */
  async init() {
    const connected = (await Network.getStatus()).connected;
    this.connected$.next(connected);
  }
}
