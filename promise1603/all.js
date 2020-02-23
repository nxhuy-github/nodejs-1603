const { addPromise } = require('./addPr');

Promise.all([addPromise(1, 2), addPromise(2,3), addPromise(3,4)])
.then(a => console.log(a))
.catch(err => console.log(err));

Promise.race([addPromise(1, 2), addPromise(2,3), addPromise(3,4)])
.then(a => console.log(a))
.catch(err => console.log(err));

