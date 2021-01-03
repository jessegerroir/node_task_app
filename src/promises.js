
const add = (a, b) => {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(a + b)
            }, 2000)
        })
}

// This is the ugly way of chaining calls as you end up with more and more nesting

add(1, 2).then((sum) => {
    console.log(sum);

    add(sum, 5).then(() => {
        console.log(sum2);
    }).catch((error) => {
        console.log(e);
    })

}).catch((error) => {
    console.log(e);
});

// This is proper chaining!
// Each call of the function calls 'then' to complete and in it returns
// another call to the function which you can then chain with another 'then'
// and have one catch at the end

add(1, 1).then(() => {
    console.log(sum);
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2);
}).catch((error) => {
    console.log(error);
})

// Chaining with mongose calls ---

require('./db/mongoose');

const User = require('./models/user');

// 5fc969e14abbed1dfc677069

User.findByIdAndUpdate('5fc969e14abbed1dfc677069', { age: 1}).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1})
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(e);
})

// using async await, this is the same as above ------

const updateAgeAndCount = async (id, age) => {
    // get the user and update
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount('5fc969e14abbed1dfc677069', 2).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
})