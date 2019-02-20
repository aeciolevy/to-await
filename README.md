# To-await

To-await is a good way to write Async code as Sync.

It it based on this article [How to write async await without try-catch blocks in Javascript](https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/) and it has the only addition that we support Promise.All.

I have been using this more than an year in production. It is pretty simple approach to avoid callback hell and promise chain. Furthermore, I found my self nesting try and catch and that was the main reason that I started to use it.

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
const {to, toAll } = require('to-await');
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
