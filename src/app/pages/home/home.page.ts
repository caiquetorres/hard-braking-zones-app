import { Component, HostBinding, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { Acceleration } from '@capacitor/motion';

import { IPoint } from '../../models/interfaces/point.interface';
import { IVersion } from '../../models/proxies/version.interface';

import { AlertService } from '../../services/alert/alert.service';
import { BrowserService } from '../../services/browser/browser.service';
import { DeviceService } from '../../services/device/device.service';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { MotionService } from '../../services/motion/motion.service';
import { PointService } from '../../services/point/point.service';
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
  /**
   * Property that says if the user is collecting the data or not.
   */
  @HostBinding('class.tracking')
  tracking = false;

  /**
   * Property that defines an object that contanis all the device
   * position data.
   */
  position: Position;

  /**
   * Property that defines an object that contains all the device
   * acceleration data.
   */
  acceleration: Acceleration;

  /**
   * Property that defines the device unique identifier.
   */
  private deviceId: string;

  constructor(
    private readonly geolocationService: GeolocationService,
    private readonly motionService: MotionService,
    private readonly deviceService: DeviceService,
    private readonly versionService: VersionService,
    private readonly alertService: AlertService,
    private readonly browserService: BrowserService,
    private readonly pointService: PointService,
  ) {}

  async ngOnInit() {
    setInterval(() => {
      this.savePoint();
    }, environment.constants.getPointInterval);

    const version = await this.fetchVersion();

    if (version.value.version !== environment.version) {
      await this.showAlert(version);
    }
  }

  startTrip() {
    this.tracking = true;
  }

  stopTrip() {
    this.tracking = false;
  }

  /**
   * Method that saves a new point based on the user's position
   * and acceleration.
   */
  private async savePoint() {
    this.acceleration = this.getAcceleration();
    this.position = await this.getPosition();
    this.deviceId ??= await this.getDeviceId();

    if (!this.tracking) {
      return;
    }

    const point: IPoint = {
      latitude: this.position.coords.latitude,
      longitude: this.position.coords.longitude,
      speed: this.position.coords.speed,
      accuracy: this.position.coords.speed,
      acclX: this.acceleration.x,
      acclY: this.acceleration.y,
      acclZ: this.acceleration.z,
      deviceId: this.deviceId,
      timestamp: this.position.timestamp,
    };

    await this.pointService.save(point);
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
   * Method that gets the user's current acceleration.
   *
   * @returns an object that contains all the acceleration data.
   */
  private getAcceleration() {
    return this.motionService.getCurrentAcceleration();
  }

  /**
   * Method that gets the user's current position.
   *
   * @returns an object that contains all the position daat.
   */
  private getPosition() {
    return this.geolocationService.getCurrentPosition();
  }

  /**
   * Method that gets the device id.
   *
   * @returns an string that represents the device id.
   */
  private getDeviceId() {
    return this.deviceService.getId();
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
