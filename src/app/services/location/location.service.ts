import { Injectable } from '@angular/core';

import { HelperService } from '../helper/helper.service';
import { NetworkService } from '../network/network.service';
import { SqliteService } from '../sqlite/sqlite.service';
import { UploadService } from '../upload/upload.service';

import { ILocation, Location } from '@hard-braking-zones/location';

/**
 * Service that deals with all the logic related with `location`.
 */
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(
    private readonly helperService: HelperService,
    private readonly networkService: NetworkService,
    private readonly sqliteService: SqliteService,
    private readonly uploadService: UploadService,
  ) {
    networkService.connected$.subscribe((connected) => {
      if (connected) {
        this.sync();
      }
    });
  }

  init() {
    setInterval(async () => {
      await this.save();
    }, 1000);

    setInterval(async () => {
      await this.sync();
    }, 1000 * 100);
  }

  /**
   * Method that saves the user's current `location`, it can be saved into
   * de sql database or, if connected with internet, into de Influx
   * database.
   */
  private async save() {
    if (!this.helperService.mobile) {
      return;
    }

    const location = await Location.getLocation();

    location.speed = +location.speed.toFixed(4);
    location.accuracy = +location.accuracy.toFixed(4);

    await this.saveInLocalDatabase(location);
  }

  /**
   * Method that synchronizes the data with the backend.
   */
  private async sync() {
    if (!this.sqliteService.database || !this.networkService.connected$.value) {
      return;
    }

    try {
      const locations = await this.getAllLocationsFromLocalDatabase();
      const file = this.createFileFromString(JSON.stringify(locations));

      await this.uploadService.uploadFile(file);
    } catch (err) {
      console.error(err);
    } finally {
      await this.clearDatabase();
    }
  }

  /**
   * Method that saves into the sql database the passed `location` data.
   *
   * @param location defines an object that contains the `location` data.
   */
  private async saveInLocalDatabase(location: ILocation) {
    await this.sqliteService.database.transaction((tx) => {
      tx.executeSql(
        `
      INSERT INTO location (device_id, speed, accuracy, longitude, latitude) VALUES (?,?,?,?,?)
    `,
        [
          location.deviceId,
          location.speed.toFixed(4),
          location.accuracy.toFixed(4),
          location.longitude,
          location.latitude,
        ],
      );
    });
  }

  /**
   * Method that retrieves all the data saved in sqlite.
   *
   * @returns an array with all the saved objects.
   */
  private async getAllLocationsFromLocalDatabase() {
    return new Promise<ILocation[]>((resolve, reject) => {
      this.sqliteService.database.transaction((tx) => {
        const objects = [];
        tx.executeSql(
          'SELECT * from location',
          [],
          (_: any, result: any) => {
            for (let i = 0; i < result.rows.length; i++) {
              const object = result.rows.item(i);

              delete object.id;
              object.deviceId = object.device_id;
              delete object.device_id;

              objects.push(object);
            }
            resolve(objects);
          },
          (err: any) => {
            reject(err);
          },
        );
      });
    });
  }

  /**
   * Method that delete all the database data.
   */
  private async clearDatabase() {
    new Promise<void>((resolve, reject) => {
      this.sqliteService.database.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM location',
          [],
          () => {
            resolve();
          },
          (err: any) => {
            reject(err);
          },
        );
      });
    });
  }

  /**
   * Method that creates a file based on the given string.
   *
   * @param content defines the content that will be saved.
   * @returns the created js file.
   */
  private createFileFromString(content: string) {
    return new File(
      [
        new Blob([content], {
          type: 'text/csv',
        }),
      ],
      'data',
      {
        type: 'text/csv',
      },
    );
  }
}
