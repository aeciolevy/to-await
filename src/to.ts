import { Options } from './types';

export function to(promise: Promise<any>, options: Options = { parser: 'array' }): Promise<any|{ error: any, data: any}> {
  return promise.then(data => {
    if ('object' === options.parser) {
      return { error: null, data };
    } else {
      return [null, data];
    }
  }).catch(error => {
      if ('object' === options.parser) {
        return { error, data: null}
      } else {
        return [error, null];
      }
    });
}
