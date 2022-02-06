import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IWsResponse } from '../../models/interfaces/ws-response.interface';

import { HelperService } from '../helper/helper.service';
import { NetworkService } from '../network/network.service';
import { UploadService } from '../upload/upload.service';

import { environment } from '../../../environments/environment';

import { ILocation, Location } from '@hard-braking-zones/location';

type ICompleteLocation = ILocation & {
  timestamp: number;
};

/**
 * Service that deals with all the logic related with `location`.
 */
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  /**
   * Property that defines an object that represents the websocket client.
   */
  websocket: WebSocket;

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
    private readonly networkService: NetworkService,
    private readonly helperService: HelperService,
    private readonly uploadService: UploadService,
  ) {
    networkService.connected$.subscribe((connected) => {
      if (connected && this.helperService.mobile) {
        this.sync();
        this.websocket ??= new WebSocket(environment.baseWsUrl);
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

    await Location.addListener('location', (location) => this.save(location));
    await Location.init({
      interval: environment.constants.getLocationIntervalInSeconds,
    });

    this.websocket = new WebSocket(environment.baseWsUrl);
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
      timestamp: new Date().getTime(),
      ...rest,
    };

    if (this.networkService.connected$.value) {
      console.log({
        state: this.websocket.readyState,
      });

      if (this.websocket.readyState === this.websocket.OPEN) {
        this.websocket.send(
          JSON.stringify({
            event: 'location',
            data: formatedLocation,
          } as IWsResponse<ICompleteLocation>),
        );
      } else if (
        this.websocket.readyState === this.websocket.CLOSED ||
        this.websocket.readyState === this.websocket.CLOSING
      ) {
        this.websocket = new WebSocket(environment.baseWsUrl);
      }
    } else {
      this.locations.push(formatedLocation);
    }
  }

  /**
   * Method that synchronizes the data with the backend.
   */
  private async sync() {
    this.loading$.next(true);
    try {
      const file = this.createFileFromString(JSON.stringify(this.locations));
      await this.uploadService.uploadFile(file);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      this.loading$.next(false);
      this.locations = [];
    }
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
