import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { HelperService } from './services/helper/helper.service';
import { LocationService } from './services/location/location.service';
import { SettingsService } from './services/settings/settings.service';
import { SqliteService } from './services/sqlite/sqlite.service';
import { StatusBarService } from './services/status-bar/status-bar.service';

/**
 * Component that represents the application.
 */
@Component({
  selector: 'hbz-root',
  template: `
    <ion-app>
      <ion-router-outlet id="main"></ion-router-outlet>
      <hbz-menu></hbz-menu>
    </ion-app>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly storage: Storage,
    private readonly helperService: HelperService,
    private readonly settingsService: SettingsService,
    private readonly sqliteService: SqliteService,
    private readonly statusBarService: StatusBarService,
    private readonly locationService: LocationService,
  ) {}

  async ngOnInit() {
    this.setupScreenOrientation();
    await this.statusBarService.setColor('#c57600');
    await this.setupStorage();
    await this.locationService.init();
    this.settingsService.init();
  }

  /**
   * Method that setups the application screen orientation.
   */
  private setupScreenOrientation() {
    if (!this.helperService.mobile) {
      return;
    }
    window.screen.orientation.lock('portrait');
  }

  /**
   * Method that initializes the app storage.
   */
  private async setupStorage() {
    await this.storage.create();
    await this.sqliteService.create();
  }
}
