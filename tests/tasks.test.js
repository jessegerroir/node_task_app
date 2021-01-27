
const request = require('supertest');
const { set } = require('../src/app');
const app = require('../src/app');
const Task = require('../src/models/tasks');

// Setup the databse before we test
const { 
        userOneId, 
        userOne, 
        setupDatabase,
        userTwo,
        taskOne,
        taskTwo,
        taskThree 
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "fourth",
            description: "fourth",
            completed: false
        }).expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
})

test('request all tasks for user 1', async () => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    expect(response.body.length).toEqual(2);
})

test('delete task failed', async () => {
    const response = await request(app)
    .delete('/tasks')
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
})