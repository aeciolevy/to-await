import { Options } from './types';

export function toAll(promises: Promise<any>[], options: Options = { parser: 'array' }): Promise<any|{error: any, data: any}> {
  return Promise.all([...promises])
    .then(data => {
      if ('object' === options.parser) {
        return { error: null, data };
      } else {
        return [null, data];
      }
    }).catch(error => {
      if ('object' === options.parser) {
        return { error, data: null };
      } else {
        return [error, null];
      }
    });
}
