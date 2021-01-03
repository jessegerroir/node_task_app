
// This is a callback pattern example

// This function accepts a callback function
// then after 2 seconds calls it with an error
const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('this is my error', undefined);

        callback(undefined, 'success');

    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error);
    }

    console.log(result);

})

// Using promises --------------

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // this went well
        resolve('sucess');
        // things did not go well
        // reject('error');
    }, 2000);
});

doWorkPromise.then((result) => {
    console.log('succes', result);
}).catch((error) => {
    console.log('error!', error);
});

// Promise --- Pending --> fullfilled OR rejected