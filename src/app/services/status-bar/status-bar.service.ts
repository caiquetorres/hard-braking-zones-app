import { Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';

import { HelperService } from '../helper/helper.service';

/**
 * Service that deals with the status bar behaviour.
 */
@Injectable({
  providedIn: 'root',
})
export class StatusBarService {
  constructor(private readonly helperService: HelperService) {}

  /**
   * Sets the status bar color.
   *
   * @param color defines the new status bar color.
   */
  public async setColor(color: string): Promise<void> {
    if (!this.helperService.mobile) {
      return;
    }
    await StatusBar.setBackgroundColor({ color });
  }
}
