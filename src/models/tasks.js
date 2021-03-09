const mongoose = require('mongoose');

// Schema for the Task table
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
    // creates a foreign key between task and the user
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
