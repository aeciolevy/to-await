export function toAll(promises: Promise<any>[]): Promise<any[]> {
  return Promise.all([...promises])
    .then(data => [null, data])
    .catch(error => [error, null]);
}
