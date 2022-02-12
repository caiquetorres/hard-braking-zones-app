import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

/**
 * Service that deals with all the device data.
 */
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  /**
   * Method that gets from the device it unique identifier.
   *
   * @returns an uuis string value.
   */
  async getId() {
    const response = await Device.getId();
    return response.uuid;
  }
}
