const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: 3
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
        minLength: 3
    },
    owner: { // creates a relationship between task and the user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

// const newTask = new Task({
//     name: 'Do coureses 222',
//     description: 'javascript courses',
//     completed: false
// });

// newTask.save().then((obj) => {
//     console.log(obj);
// }).catch((error) => {
//     console.log(error);
// });