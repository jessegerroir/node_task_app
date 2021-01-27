
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative')
            }

            resolve(a + b)
        }, 2000)
    })
}

// async functions always return a promise
// that promise is always fullfilled with the value the function returns
// If we throw an error we're rejecting the promise with that error

// await lets us call functions asyncherously. It waits on the 'await' keyword for the function
// to resolve or reject. If it resolves it goes to the next line. If it retjects then it just
// skips the rest and returns the error that we can catch.
// It's a little like having a bunch of chained functions except all in one line and things
// handled more implicitly. it also keeps all the variables in scope in one function.

const doWork = async () => {
    const sum = await add(1, 99);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, -3);
    return sum3;
}

doWork().then((result) => {
    console.log('result', result);
}).catch((error) => {
    console.log('error', error);
});