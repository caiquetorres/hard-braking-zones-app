import { Component, ViewChild } from '@angular/core';
import { IonCheckbox } from '@ionic/angular';

import { ISettings } from '../../models/interfaces/settings.interface';

import { SettingsService } from '../../services/settings/settings.service';

/**
 * Component that represents the application settings page.
 */
@Component({
  selector: 'hbz-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  /**
   * Property that defines an object that represents the checkbox
   * component.
   */
  @ViewChild(IonCheckbox)
  checkbox: IonCheckbox;

  settings: ISettings;

  constructor(private readonly settingsService: SettingsService) {
    settingsService
      .get$()
      .subscribe((settings) => (this.settings = settings ?? {}));
  }

  async save() {
    this.settingsService.set(this.settings);
  }
}
