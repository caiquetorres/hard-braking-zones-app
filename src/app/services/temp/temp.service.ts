import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service that can cache any needed data and makes easier detecting changes
 * in it, read and set new values
 */
@Injectable({
  providedIn: 'root',
})
export class TempService {
  /**
   * Property that stores all the cached data
   */
  private readonly map = new Map<string, BehaviorSubject<unknown>>();

  /**
   * Method that checks if some key has any data cached in the application
   *
   * @param key stores the key string data
   * @returns true, if there is some data cached, otherwise false
   */
  public cached(key: string): boolean {
    return this.map.has(key) && this.map.get(key).value !== undefined;
  }

  /**
   * Method that caches some data
   *
   * @param key stores the key string data
   * @param data stores the data that will be cached
   */
  public set<T>(key: string, data: T): void {
    if (this.map.has(key)) {
      this.map.get(key).next(data);
      return;
    }
    this.map.set(key, new BehaviorSubject<T>(data));
  }

  /**
   * Method that can get some data based on the key value
   *
   * @param key stores the key string data
   * @returns the data represented for the "key" parameter
   */
  public get<T>(key: string): T {
    if (!this.map.has(key)) {
      this.set<T>(key, undefined);
    }
    return this.map.get(key).value as T;
  }

  /**
   * Method that can get some data based on the key value
   *
   * @param key stores the key string data
   * @returns the data as observable, to allow detecting any changes in
   * this data
   */
  public get$<T>(key: string): Observable<T> {
    if (!this.map.has(key)) {
      this.set<T>(key, undefined);
    }
    return this.map.get(key).asObservable() as Observable<T>;
  }

  /**
   * Method that removes some data cached
   *
   * @param key stores the key string data
   */
  public delete(key: string): boolean {
    return this.map.delete(key);
  }

  /**
   * Method that clears all the data cached
   */
  public clear(): void {
    this.map.clear();
  }
}
