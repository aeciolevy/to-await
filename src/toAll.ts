import { ToAllResult } from "./types";

function toAll<T>(promises: Array<Promise<T>>): Promise<ToAllResult<T>> {
  return Promise.all(promises)
    .then(value => ({
      error: undefined,
      data: value
    }))
    .catch(reason => ({
      error: reason,
      data: undefined
    }));
}

export default toAll;
