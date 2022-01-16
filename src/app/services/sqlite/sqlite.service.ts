import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-enterprise/secure-storage/ngx';

import { HelperService } from '../helper/helper.service';

/**
 * Service that is responsible for dealing with all the offline data.
 */
@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  /**
   * Property that defines an object that represents the `sqlite` database.
   */
  database: SQLiteObject;

  constructor(
    private readonly sqlite: SQLite,
    private readonly helperService: HelperService,
  ) {}

  /**
   * Method that initializes the `sqlite` database.
   */
  async create() {
    if (!this.helperService.mobile) {
      return;
    }

    try {
      this.database = await this.sqlite.create({
        name: 'database',
        location: 'default',
      });

      this.database.transaction((tx) => {
        tx.executeSql(
          `
          CREATE TABLE IF NOT EXISTS location(
            id INTEGER PRIMARY KEY,
            device_id VARCHAR(10) NOT NULL,
            speed REAL NOT NULL,
            accuracy REAL NOT NULL,
            longitude VARCHAR(22) NOT NULL,
            latitude VARCHAR(22) NOT NULL,
            timestamp DATE NOT NULL
          )
        `,
          [],
        );
      });
    } catch (err) {
      console.error('Unable to initialize database', err);
    }
  }
}
