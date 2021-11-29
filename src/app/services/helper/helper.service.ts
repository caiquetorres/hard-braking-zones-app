import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

/**
 * Service that deals with some useful methods and properties.
 */
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  /**
   * Property that says if the application is being runned in a mobile
   * device or not.
   */
  get mobile() {
    return this.platform.is('capacitor') || this.platform.is('cordova');
  }

  constructor(private readonly platform: Platform) {}
}
