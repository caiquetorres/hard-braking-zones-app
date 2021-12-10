import { Injectable } from '@angular/core';

import { HelperService } from '../helper/helper.service';

import { Location } from '@hard-braking-zones/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private readonly helperService: HelperService) {}

  async getLocation() {
    if (!this.helperService.mobile) {
      return;
    }
    return await Location.getLocation();
  }
}
