require('./db/mongoose');

const Task = require('./models/tasks');

Task.findByIdAndDelete('5fc5b5a05b0cfc3ae0bd9374').then(() => {
    return Task.countDocuments({ completed: false});
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})

// using async and await

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    return await Task.countDocuments({completed: false});
}

deleteTaskAndCount('5fc859394345ef1224de9ab4').then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(result);
});