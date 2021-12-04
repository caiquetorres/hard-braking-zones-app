import { Injectable } from '@angular/core';

import { ISettings } from '../../models/interfaces/settings.interface';

import { CacheService } from '../cache/cache.service';
import { TempService } from '../temp/temp.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: ISettings;

  constructor(
    private readonly tempService: TempService,
    private readonly cacheService: CacheService,
  ) {}

  async setup() {
    this.settings = await this.cacheService.get(environment.keys.settings);
    this.tempService.set(environment.keys.settings, this.settings);
  }

  get$() {
    return this.tempService.get$(environment.keys.settings);
  }

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
