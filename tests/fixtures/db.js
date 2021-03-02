const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/tasks');
const { MongoServerSelectionError } = require('mongodb');
const config = require('../../config/config');

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

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first task',
    completed: false,
    name: 'task1',
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'second task',
    completed: true,
    name: 'task2',
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'third task',
    completed: true,
    name: 'task3',
    owner: userTwo._id
}

const setupDatabase = async () => {
        // delete all users to wipe database for testing
        await User.deleteMany();
        await Task.deleteMany();

        // create our test user
        await new User(userOne).save();
        await new User(userTwo).save();

        // create our tasks
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