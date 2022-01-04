import { Injectable } from '@angular/core';

import { ISettings } from '../../models/interfaces/settings.interface';

import { CacheService } from '../cache/cache.service';
import { TempService } from '../temp/temp.service';

import { environment } from '../../../environments/environment';

/**
 * Service that deals with all the settings data.
 */
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  /**
   * Property that defines an object that represents the application
   * current settings.
   */
  settings: ISettings;

  constructor(
    private readonly tempService: TempService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Method that initializes the settings service.
   */
  async init() {
    this.settings = await this.cacheService.get(environment.keys.settings);
    this.tempService.set(environment.keys.settings, this.settings);
  }

  /**
   * Method that gets the current `settings` as observable.
   *
   * @returns an object that represents the observable.
   */
  get$() {
    return this.tempService.get$<ISettings>(environment.keys.settings);
  }

  /**
   * Method that saves the new `settings` state.
   *
   * @param settings defines an object that represents the new app
   * `settings`.
   */
  async set(settings: ISettings) {
    await this.cacheService.set(environment.keys.settings, {
      ...this.settings,
      ...settings,
    });
    this.tempService.set(environment.keys.settings, {
      ...this.settings,
      ...settings,
    });
  }
}
