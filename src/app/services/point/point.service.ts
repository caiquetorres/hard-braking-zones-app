import { Injectable } from '@angular/core';

import { IPoint } from '../../models/interfaces/point.interface';

import { ConvertService } from '../convert/convert.service';
import { NetworkService } from '../network/network.service';
import { UploadService } from '../upload/upload.service';

import { environment } from '../../../environments/environment';

/**
 * Service that deals with all the point busincess logic in the
 * application.
 */
@Injectable({
  providedIn: 'root',
})
export class PointService {
  /**
   * Property that says if the application is connected with the
   * internet or not.
   */
  private connected = false;

  /**
   * Property that defines an array that stores temporarily the
   * user generated points.
   */
  private points: IPoint[] = [];

  /**
   * Property that says if the current saved data can be sent to
   * the backend or not.
   */
  get canSend() {
    return (
      this.connected &&
      Math.floor(this.points.length / environment.constants.savePointsAmount)
    );
  }

  constructor(
    networkService: NetworkService,
    private readonly convertService: ConvertService,
    private readonly uploadService: UploadService,
  ) {
    networkService.connected$
      .asObservable()
      .subscribe((connected) => (this.connected = connected));
  }

  /**
   * Method that saves a new point in the `sqlite` database.
   *
   * @param point defines an object that contains all the point
   * data.
   */
  async save(point: IPoint) {
    if (this.canSend) {
      this.send();
    }

    this.points.push(point);
  }

  /**
   * Method that sands all the saved points to the backend and
   * after that cleans the array.
   */
  private async send() {
    const temp = [...this.points];
    this.points = [];

    const file = this.convertService.stringToFile(JSON.stringify(temp));

    // await this.uploadService.uploadFile(file);
  }
}
