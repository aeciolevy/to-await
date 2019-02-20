/**
* @author Aécio Levy
* @function toAll
* @usage: Use async/await with catch
* @param { Promise }
* @summary: Based on https://github.com/scopsy/await-to-js
*/
module.exports = allPromise => Promise.all([...allPromise])
    .then(data => [null, data])
    .catch(err => [err, null]);
