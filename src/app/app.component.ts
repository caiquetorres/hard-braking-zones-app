import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

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
  constructor(private readonly storage: Storage) {}

  async ngOnInit() {
    await this.setupStorage();
  }

  /**
   * Method that initializes the app storage.
   */
  private async setupStorage() {
    await this.storage.create();
  }
}
