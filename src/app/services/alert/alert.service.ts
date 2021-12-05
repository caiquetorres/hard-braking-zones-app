import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular';

/**
 * Service that controls the main application alert.
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  /**
   * Property that defines an object that represents the alert.
   */
  alert: HTMLIonAlertElement;

  constructor(private readonly alertController: AlertController) {}

  /**
   * Method that opens the loading alert.
   *
   * @param options defines an object that contains the alert properties
   */
  async present(
    options?: Omit<AlertOptions, 'cssClass'> & {
      cssClass?: 'hbz-alert-primary';
    },
  ) {
    options.cssClass ??= 'hbz-alert-primary';
    this.alert = await this.alertController.create(options);
    await this.alert.present();
  }

  /**
   * Method that closes the alert.
   */
  async dismiss() {
    await this.alert.dismiss();
  }
}
