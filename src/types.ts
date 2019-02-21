export interface ToResult<T> {
  error?: Error;
  data?: T;
}

export interface ToAllResult<T> {
  error?: Error;
  data?: Array<T>;
}
