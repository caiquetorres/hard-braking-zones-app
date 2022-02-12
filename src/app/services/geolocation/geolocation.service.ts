import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

import { HelperService } from '../helper/helper.service';

/**
 * Service that deals with all the logic related with `location`.
 */
@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  /**
   * Property that defines an object that contains a mocked
   * position data for testing in browser.
   */
  private readonly mockedPosition: Position = {
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 2.123456789,
      latitude: -23.4994058,
      longitude: -47.4287354,
    },
    timestamp: new Date().getTime(),
  };

  constructor(private readonly helperService: HelperService) {}

  /**
   * Method that gets from the device the current position.
   *
   * @returns an object that contains all the location data.
   */
  getCurrentPosition() {
    if (!this.helperService.mobile) {
      return this.mockedPosition;
    }

    return Geolocation.getCurrentPosition();
  }
}
