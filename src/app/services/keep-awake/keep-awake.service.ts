import { Injectable } from '@angular/core';
import { KeepAwake } from '@capacitor-community/keep-awake';

/**
 * Service that controls the application sleep time. Allowing or
 * blocking the app to sleep.
 */
@Injectable({
  providedIn: 'root',
})
export class KeepAwakeService {
  /**
   * Method that avoids the app of sleeping.
   */
  async keepAwake() {
    await KeepAwake.keepAwake();
  }

  /**
   * Method that allows the app of sleeping.
   */
  async allowSleep() {
    await KeepAwake.allowSleep();
  }
}
