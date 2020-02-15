# To-await

To-await is an efficient and clean way to write Asynchronous code as Synchronous code.

It it based on this article - [How to write async await without try-catch blocks in Javascript](https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/) it also has the only addition that we support Promise.All.

I have been using this technique for more than a year in production. It is a pretty simple approach to avoid callback hell and promise chains. Furthermore, I found my self nesting try and catch. These are the primary cases where this package alleviates issues.

## Installation
```
npm install to-await
```

This assume that you are using [npm](www.npmjs.com) as package manager.

## The Gist

### ES6 modules

```js
import { to, toAll, toAllSettled } from 'to-await';
```

### CommonJS
```js
const { to, toAll } = require('to-await');
```

#### Promise Example
```js
import { to, toAll } from 'to-await'

const firstPassTest = async () => {
    try {
        const return10 = () => Promise.resolve(10);
        const rejected = () => Promise.reject(new Error("Something wrong"));

        let [error, result] = await to(return10());
        console.log(`error: ${error}, result: ${result}`);

        [error, result] = await to(delay(3000));
        console.log(`error: ${error}, result: ${result}`);
        [error] = await to(rejected());
        console.log(`error2: ${error}`);
        if (error) {
            throw error;
        }
    } catch (err) {
        console.error(err);
    }
};

firstPassTest();
```

#### Array of Promisses
```js
const { to, toAll } = require('to-await');
const secondTest = async () => {

    const arrayOfPromises = array => array.map(async (el, index) => 1 + index);
    const promises = arrayOfPromises([1, 2, 3, 4, 5, 6, 7]);
    let [error, data] = await toAll(promises);
    // Version 1.1.0 accept an array on to function
    // toAll with be left for backward compatibility
    // you can deal with the array of promises directly to the to function
    let [error, data] = await to(promises);
    console.log(`error: ${error}, data: ${data}`);
}

secondTest();
```

### Promise.allSettled Support

```js
const { to } from 'to-await'

const promises = [Promise.resolve(1), Promise.resolve(2), Promise.reject(new Error('Something went wrong'))];
// Version 1.1.0 has options where you can pass { allSettled: true }
// to do the same of Promise.allSettled
let [rejected, fulfilled] = await to(promises, { allSettled: true });
```

#### Console.log Output
```

     rejected = [{
        status: 'rejected',
        reason: Error: Something went wrong
            at Object.<anonymous> (/Users/aeciolevy/npm-packages/to-await/test/index.test.ts:82:78)
            at Object.asyncJestTest (/Users/aeciolevy/npm-packages/to-await/node_modules/jest-jasmine2/build/jasmineAsyncInstall.js:100:37)
            at /Users/aeciolevy/npm-packages/to-await/node_modules/jest-jasmine2/build/queueRunner.js:43:12
            at new Promise (<anonymous>)
            at mapper (/Users/aeciolevy/npm-packages/to-await/node_modules/jest-jasmine2/build/queueRunner.js:26:19)
            at /Users/aeciolevy/npm-packages/to-await/node_modules/jest-jasmine2/build/queueRunner.js:73:41
            at processTicksAndRejections (internal/process/task_queues.js:93:5)
      }
    ]
    fulfilled = [
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 }
    ]

```

#### toAllSettled interface
```js
import { toAllSettled } from 'to-await'
// this will produce the same output above
// is the user option to call to with the options or call `toAllSettled`
let mixedPromises = [Promise.resolve(1), Promise.reject(new Error('something went wrong')), Promise.resolve(2)];
let [rejected, fulfilled] = await toAllSettled(mixedPromises);
```



### Where it might help you
In this case below, if you want to use a try catch to wrap you function, you are not able to throw an error inside of the callback/Promise since you are inside of another scope.
This is an example from [nodejs](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) docs.
```js
const fs = require('fs');
const { promifisy } = require('util');

const writeAsync = promisify(fs.writeFile);
const data = new Uint8Array(Buffer.from('Hello Node.js'));

function foo() {
    try {
        fs.writeFile('message.txt', data, (err) => {
            // this throw will not be catch by the throw
            // because you are inside the callback
            if (err) throw err;
            console.log('The file has been saved!');
        });
    } catch (err) {
        console.error(err);
    }
}

async function fooNicer() {
    try {
        const [error] = await to(writeAsync('message.txt', data, ));
        if (error) {
            throw error;
        }
        console.log('The file has been saved!');
    } catch (err)
}
```
