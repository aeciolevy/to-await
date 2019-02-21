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
import { to, toAll } from "to-await";
```

### CommonJS

```js
const { to, toAll } = require("to-await");
```

#### Promise Example

```js
import { to, toAll } from "to-await";

const firstPassTest = async () => {
  try {
    const return10Response = await to(return10());
    console.log(
      `error: ${return10Result.error}, result: ${return10Result.data}`
    );

    const delayResponse = await to(delay(3000));
    console.log(`error: ${delayResponse.error}, result: ${delayResponse.data}`);

    // Example with destructuring
    const { error } = await to(rejected());
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
const { to, toAll } = require("to-await");

const secondTest = async () => {
  const arrayOfPromises = array => array.map(async (el, index) => 1 + index);
  const promises = arrayOfPromises([1, 2, 3, 4, 5, 6, 7]);
  let { error, data } = await toAll(promises);
  console.log(`error: ${error}, data: ${data}`);
};

secondTest();
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
        const { error } = await to(writeAsync('message.txt', data, ));
        if (error) {
            throw error;
        }
        console.log('The file has been saved!');
    } catch (err)
}
```
