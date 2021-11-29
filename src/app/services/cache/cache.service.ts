import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Service responsible for caching in the device storage data.
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public constructor(private readonly storage: Storage) {}

  /**
   * Method that checks if some key has any data cached in the application
   *
   * @param key stores the key string data
   * @returns true, if there is some data cached, otherwise false
   */
  public async cached(key: string): Promise<boolean> {
    return await this.storage
      .get(key)
      .then((value) => value !== undefined && value !== null);
  }

  /**
   * Method that caches some data
   *
   * @param key stores the key string data
   * @param data stores the data that will be cached
   */
  public async set<T>(key: string, data: T): Promise<void> {
    await await this.storage.set(key, data);
  }

  /**
   * Method that can get some data based on the key value
   *
   * @param key stores the key string data
   * @returns the data represented for the "key" parameter
   */
  public async get<T>(key: string): Promise<T> {
    return (await this.storage.get(key)) as T;
  }

  /**
   * Method that removes some data cached
   *
   * @param key stores the key string data
   */
  public async delete(key: string): Promise<boolean> {
    return this.storage
      .remove(key)
      .then((value) => value !== undefined && value !== null);
  }

  /**
   * Method that clears all the data cached
   */
  public async clear(): Promise<void> {
    await this.storage.clear();
  }
}
