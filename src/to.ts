import { toAll } from './toAll';
import { toAllSettled } from './toAllSettled';

type Options = {
  allSettled?: boolean;
}

// @ts-ignore: Function lacks ending return statement and return type does not include 'undefined'.ts(2366)
export function to(promise: Promise<any> | Promise<any>[], options?: Options): Promise<any[]> {
    // User pass options
    if (options) {
      const { allSettled } = options;
      if (Array.isArray(promise) && allSettled) {
        return toAllSettled(promise);
      }
    } else {
      if (Array.isArray(promise)) {
        return toAll(promise);
      } else {
        return promise.then(data => [null, data]).catch(error => [error, null]);
      }
    }
}
