import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HelperService } from '../helper/helper.service';
import { NetworkService } from '../network/network.service';
import { UploadService } from '../upload/upload.service';

import { environment } from '../../../environments/environment';

import { ILocation, Location } from '@hard-braking-zones/location';
import { Socket } from 'ngx-socket-io';

type ICompleteLocation = ILocation & { timestamp: Date };

/**
 * Service that deals with all the logic related with `location`.
 */
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  /**
   * Property that defines an object that represents an event that is
   * called when the loading stars or ends.
   */
  loading$ = new BehaviorSubject<boolean>(false);

  /**
   * Property that defines an array that contains all the saved
   * locations when the app was running in offline mode.
   */
  private locations: ICompleteLocation[] = [];

  constructor(
    private readonly socket: Socket,
    private readonly networkService: NetworkService,
    private readonly helperService: HelperService,
    private readonly uploadService: UploadService,
  ) {
    networkService.connected$.subscribe((connected) => {
      if (connected && this.helperService.mobile) {
        this.sync();
      }
    });
  }

  /**
   * Method that initializes the service.
   */
  async init() {
    if (!this.helperService.mobile) {
      return;
    }

    this.socket.connect();

    await Location.addListener('location', (location) => this.save(location));

    await Location.init({
      interval: environment.constants.getLocationIntervalInSeconds,
    });
  }

  /**
   * Method that saves the user's current `location`, it can be saved into
   * de sql database or, if connected with internet, into de Influx
   * database.
   */
  private save(location: ILocation) {
    const { speed, accuracy, ...rest } = location;

    const formatedLocation: ICompleteLocation = {
      speed: +speed.toFixed(4),
      accuracy: +accuracy.toFixed(4),
      timestamp: new Date(),
      ...rest,
    };

    if (this.networkService.connected$.value) {
      this.socket.emit('location', formatedLocation);
    } else {
      this.locations.push(formatedLocation);
    }
  }

  /**
   * Method that synchronizes the data with the backend.
   */
  private async sync() {
    try {
      const file = this.createFileFromString(JSON.stringify(this.locations));
      await this.uploadService.uploadFile(file);
    } catch (err) {
      console.error(err);
    } finally {
      this.locations = [];
    }

    return true;
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
