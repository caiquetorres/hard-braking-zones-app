import { Injectable } from '@angular/core';
import { Acceleration, Motion } from '@capacitor/motion';

import { HelperService } from '../helper/helper.service';

/**
 * Service that deals with all the motion data in the application.
 */
@Injectable({
  providedIn: 'root',
})
export class MotionService {
  /**
   * Property that defines an object that represents the current
   * app acceleration.
   */
  private acceleration: Acceleration;

  /**
   * Property that defines an object that contains a mocked
   * acceleration data for testing in browser.
   */
  private readonly mockedAcceleration: Acceleration = {
    x: 0,
    y: 0,
    z: 0,
  };

  constructor(private readonly helperService: HelperService) {
    Motion.addListener('accel', (value) => {
      const { acceleration } = value;

      acceleration.x ??= 0;
      acceleration.y ??= 0;
      acceleration.z ??= 0;

      this.acceleration = value.acceleration;
    });
  }

  /**
   * Method that gets from the device the current acceleration.
   *
   * @returns an object that contains all the acceleration data.
   */
  getCurrentAcceleration() {
    if (!this.helperService.mobile) {
      return this.mockedAcceleration;
    }

    return this.acceleration;
  }
}
