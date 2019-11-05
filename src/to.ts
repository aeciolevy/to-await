export function to(promise: Promise<any>): Promise<any[]> {
  return promise.then(data => [null, data]).catch(error => [error, null]);
}
