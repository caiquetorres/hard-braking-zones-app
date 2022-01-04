import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

/**
 * Service that controls the main application `loading`.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  /**
   * Property that defines an object that represents the `loading` modal.
   */
  private loading: HTMLIonLoadingElement;

  constructor(private readonly loadingController: LoadingController) {}

  /**
   * Method that opens the `loading` modal.
   *
   * @param options defines an object that contains the modal properties
   */
  async present(options?: LoadingOptions) {
    options.cssClass ??= 'hbz-loading-primary';
    this.loading = await this.loadingController.create(options);
    await this.loading.present();
  }

  /**
   * Method that closes the modal.
   */
  async dismiss() {
    await this.loading.dismiss();
  }
}
