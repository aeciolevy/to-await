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
import { to, toAll } from 'to-await';
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
    console.log(`error: ${error}, data: ${data}`);
}

secondTest();
```
