const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function CustomPromise(executor) {
    let state = PENDING;
    let value = null;
    let handlers = [];
    let catchers = [];

    function resolve(result) {
        if (state !== PENDING) return;

        state = FULFILLED;
        value = result;
        handlers.forEach(h => h(value));
    }

    function reject(err) {
        if (state !== PENDING) return;

        state = REJECTED;
        value = err;
        catchers.forEach(c => c(value));
    }

    this.then = callback => {
        if (state === FULFILLED) {
            callback(value);
        } else {
            handlers.push(callback);
        }
    }

    executor(resolve, reject);
}

const doWork = (resolve, reject) => {
    setTimeout(() => {resolve('Hello World')}, 1000);
}

const somePromise = new CustomPromise(doWork);

somePromise.then(val => {
    console.log('1st log', val);
});

somePromise.then(val => {
    console.log('2nd log', val);
});

setTimeout(() => {
    somePromise.then(val => {
        console.log('3rd log', val);
    });
}, 3000)

