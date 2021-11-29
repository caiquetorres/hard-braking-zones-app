/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Function that wais form the informed milliseconds to resolve the promise.
 *
 * @param milliseconds defines the time amout to wait before resolving the promise.
 */
export function wait(milliseconds: number) {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, milliseconds);
  });
}
