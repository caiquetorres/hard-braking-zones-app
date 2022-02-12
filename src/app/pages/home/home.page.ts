import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { Acceleration } from '@capacitor/motion';

import { IVersion } from '../../models/proxies/version.interface';

import { AlertService } from '../../services/alert/alert.service';
import { BrowserService } from '../../services/browser/browser.service';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { MotionService } from '../../services/motion/motion.service';
import { VersionService } from '../../services/version/version.service';

import { environment } from '../../../environments/environment';

/**
 * Component that represents the application home page.
 *
 * @example
 * ```html
 * <hbz-home></hbz-home>
 * ```
 */
@Component({
  selector: 'hbz-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  acceleration: Acceleration;

  position: Position;

  constructor(
    private readonly geolocationService: GeolocationService,
    private readonly motionService: MotionService,
    private readonly versionService: VersionService,
    private readonly alertService: AlertService,
    private readonly browserService: BrowserService,
  ) {}

  async ngOnInit() {
    setInterval(async () => {
      this.acceleration = this.motionService.getCurrentAcceleration();
      this.position = await this.geolocationService.getCurrentPosition();
    }, 100);

    const version = await this.fetchVersion();

    if (version.value.version !== environment.version) {
      await this.showAlert(version);
    }
  }

  /**
   * Method that shows the application `alert`.
   */
  private async showAlert(version: IVersion) {
    await this.alertService.present({
      header: 'Nova versão',
      message: `Uma nova versão do app foi encontrada, deseja baixa-la?`,
      buttons: [
        'Cancelar',
        {
          text: 'Fazer download',
          handler: async () => {
            await this.browserService.open(version.value.url);
          },
        },
      ],
    });
  }

  /**
   * Method that gets from the backend the default entity value.
   *
   * @returns an object that represents the found entity.
   */
  private fetchVersion() {
    return this.versionService.getOne();
  }
}
