const {to, toAll} = require('../src/index');

const return10 = () => Promise.resolve(10);

const rejected = () => Promise.reject(new Error('Something wrong'));

const delay = (time) => new Promise((resolve, reject) => setTimeout(() => resolve(50)), time);

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

const secondTest = async () => {

    const arrayOfPromises = array => array.map(async (el, index) => 1 + index);
    const promises = arrayOfPromises([1, 2, 3, 4, 5, 6, 7]);
    let [error, data] = await toAll(promises);
    console.log(`error: ${error}, data: ${data}`);
}

firstPassTest();

secondTest();
