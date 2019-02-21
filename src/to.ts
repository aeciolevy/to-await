import { ToResult } from "./types";

function to<T>(promise: Promise<T>): Promise<ToResult<T>> {
  return promise
    .then(value => ({ error: undefined, data: value }))
    .catch(reason => ({ error: reason, data: undefined }));
}

export default to;
