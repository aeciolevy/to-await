export function allSettled(promises: Promise<any>[]): Promise<any[]> {
    let wrapPromises = promises.map(promise => Promise.resolve(promise)
            .then(
                data => ({ status: 'fulfilled', value: data }),
                err => ({ status: 'rejected', reason: err })
            ));
    return Promise.all(wrapPromises);
}

export function toAllSettled(promises: Promise<any>[]): Promise<any> {
    return allSettled(promises)
        .then(results => {
            let rejected : any[] | null= results.filter(promise => 'rejected' == promise.status);
            let fulfilled: any[] | null = results.filter(promise => 'fulfilled' == promise.status);
            rejected = 0 === rejected.length ? null : rejected;
            fulfilled = 0 === fulfilled.length ? null : fulfilled;
            return [rejected, fulfilled];
        });
}
