import { allSettled, toAllSettled } from '../src/toAllSettled';
import { to } from '../src/to';

test('All settled test', async () => {
    let mixedPromises = [Promise.resolve(1), Promise.reject(new Error('something went wrong')), Promise.resolve(2)];
    let promises = await allSettled(mixedPromises);

    expect(promises.length).toBeGreaterThan(1);
    expect(promises[0].status).toBe('fulfilled');
    expect(promises[1].status).toBe('rejected');
    expect(promises[2].status).toBe('fulfilled');
    expect(promises[0].value).toBe(1);
    expect(promises[1].reason).toBeInstanceOf(Error);
    expect(promises[2].value).toBe(2);
});

test('toAllSettled with rejected and fulfilled present', async () => {
    let mixedPromises = [Promise.resolve(1), Promise.reject(new Error('something went wrong')), Promise.resolve(2)];
    let [rejected, fulfilled] = await toAllSettled(mixedPromises);

    expect(rejected.length).toBe(1);
    expect(rejected[0].reason).toBeInstanceOf(Error);
    expect(rejected[0].status).toBe('rejected');
    expect(fulfilled[0].status).toBe('fulfilled');
    expect(fulfilled[1].status).toBe('fulfilled');
    expect(fulfilled[0].value).toBe(1);
    expect(fulfilled[1].value).toBe(2);
});

test('toAllSettled without rejected and fulfilled present', async () => {
    let mixedPromises = [Promise.resolve(1), Promise.resolve(2)];
    let [rejected, fulfilled] = await toAllSettled(mixedPromises);

    expect(rejected).toBe(null);
    expect(fulfilled[0].status).toBe('fulfilled');
    expect(fulfilled[1].status).toBe('fulfilled');
    expect(fulfilled[0].value).toBe(1);
    expect(fulfilled[1].value).toBe(2);
});

test('toAllSettled without fulfilled and rejected present', async () => {
    let mixedPromises = [Promise.reject(new Error('Something went wrong'))];
    let [rejected, fulfilled] = await toAllSettled(mixedPromises);

    expect(fulfilled).toBe(null);
    expect(rejected[0].status).toBe('rejected');
    expect(rejected[0].reason).toBeInstanceOf(Error);
    expect(rejected[0].reason.message).toBe('Something went wrong');
});

test('To function', async () => {
    const return10 = () => Promise.resolve(10);
    let [error, data] = await to(return10());

    expect(error).toBe(null);
    expect(data).toBe(10);
});

test('To function handling an array', async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2)];
    let [error, data] = await to(promises);

    expect(error).toBe(null);
    expect(data.length).toBe(2);
    expect(data[0]).toBe(1);
    expect(data[1]).toBe(2);
});

test('To function with allSettled', async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2)];
    let [rejected, fulfilled] = await to(promises, { allSettled: true });

    expect(rejected).toBe(null);
    expect(fulfilled.length).toBe(2);
    expect(fulfilled[0].status).toBe('fulfilled');
    expect(fulfilled[1].status).toBe('fulfilled');
    expect(fulfilled[0].value).toBe(1);
    expect(fulfilled[1].value).toBe(2);
});

test('To function with allSettled', async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.reject(new Error('Something went wrong'))];
    let [rejected, fulfilled] = await to(promises, { allSettled: true });
    expect(rejected[0].status).toBe('rejected');
    expect(rejected[0].reason).toBeInstanceOf(Error);
    expect(fulfilled.length).toBe(2);
    expect(fulfilled[0].status).toBe('fulfilled');
    expect(fulfilled[1].status).toBe('fulfilled');
    expect(fulfilled[0].value).toBe(1);
    expect(fulfilled[1].value).toBe(2);
});

