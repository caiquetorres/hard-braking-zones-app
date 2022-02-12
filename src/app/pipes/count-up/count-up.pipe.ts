import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that is reponsible for converting a number (in seconds) to
 * a sentence such as `25 minutos e 25 segundos`.
 */
@Pipe({
  name: 'countUp',
})
export class CountUpPipe implements PipeTransform {
  /**
   * Method that is reponsible for converting a number (in seconds)
   * to a sentence such as `25 minutos e 25 segundos`.
   *
   * @param value defines the seconds amount.
   */
  transform(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;

    let sentence = '';

    if (minutes === 1) {
      sentence += `${minutes} minuto e `;
    } else if (minutes) {
      sentence += `${minutes} minutos e `;
    }

    return sentence + `${seconds} segundos`;
  }
}
