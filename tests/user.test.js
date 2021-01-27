const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/user')

const { userOneId, userOne, setupDatabase } = require('./fixtures/db');
beforeEach(setupDatabase);

test('Should sign up new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Jimbo',
        email: 'jimbo@email.com',
        password: 'MyPass777!'
    }).expect(201);

    // assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Jimbo',
            email: 'jimbo@email.com',
        }, 
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe('MyPass777!');
})

test('should login existing user', async () => {
    const response = await request(app).get('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
})

test('should not login non-existant user', async () => {
    await request(app).get('/users/login').send({
        email: userOne.email,
        password: 'fake password'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})

test('should delete account', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
})

test('should not delete account', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('should upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/test.jpg')
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Godfrey'
    }).expect(200)

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Godfrey');

});

test('should not update invalid user fields', async () => {
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'party town'
    }).expect(400);
})

