const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/tasks');
const { MongoServerSelectionError } = require('mongodb');
const config = require('../../config/config');

// User 1 test information 
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'mike',
    email: 'mike@example.com',
    password: 'pass234234',
    tokens: [{
        token: jwt.sign({ _id: userOneId}, config.jwt_secret)
    }]
}

// User 2 test information 
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'jongo',
    email: 'jongo@example.com',
    password: 'asdf1234asdf',
    tokens: [{
        token: jwt.sign({ _id: userTwoId}, config.jwt_secret)
    }]
}

// Task 1 test information 
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first task',
    completed: false,
    name: 'task1',
    owner: userOneId
}

// Task 2 test information 
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'second task',
    completed: true,
    name: 'task2',
    owner: userOneId
}

// Task 3 test information 
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'third task',
    completed: true,
    name: 'task3',
    owner: userTwo._id
}

const setupDatabase = async () => {

        // delete all users in test database to wipe database for testing
        await User.deleteMany();
        await Task.deleteMany();

        // create our test user in test database
        await new User(userOne).save();
        await new User(userTwo).save();

        // create our test tasks in test database
        await new Task(taskOne).save();
        await new Task(taskTwo).save();
        await new Task(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    taskOne,
    taskThree,
    taskTwo,
    setupDatabase
}