import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { StatusBarService } from './services/status-bar/status-bar.service';

/**
 * Component that represents the application.
 */
@Component({
  selector: 'hbz-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly storage: Storage,
    private readonly statusBarService: StatusBarService,
  ) {}

  async ngOnInit() {
    await this.setupStorage();
    await this.statusBarService.setColor('var(--hbz-color-primary)');
  }

  /**
   * Method that initializes the app storage.
   */
  private async setupStorage() {
    await this.storage.create();
  }
}
