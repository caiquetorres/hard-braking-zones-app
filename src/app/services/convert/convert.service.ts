import { Injectable } from '@angular/core';

/**
 * Service that deals with any kind of conversion in the app.
 */
@Injectable({
  providedIn: 'root',
})
export class ConvertService {
  /**
   * Method that creates a file based on the given string.
   *
   * @param content defines the content that will be saved.
   * @returns the created js file.
   */
  stringToFile(content: string) {
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
