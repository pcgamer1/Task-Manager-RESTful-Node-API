const request = require('supertest')
const app = require('../src/app')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')
const User = require('../src/models/user')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Sarthak Saxena',
        email: 'saxenasarthak72@gmail.com',
        password: 'sarthak'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
        user: {
            name: 'Sarthak Saxena',
            email: 'saxenasarthak72@gmail.com'
        },
        token: user.tokens[0].token 
    })
    expect(user.password).not.toBe('sarthak')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user.tokens[1].token).toBe(response.body.token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'sex@gmail.com',
        password: 'lulli'
    }).expect(400)
})

test('Should get user profile', async () => {
    await request(app).get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send().expect(200)
})

test('Should no get profile for unauthorized user', async () => {
    await request(app).get('/users/me').send().request(401)
}) 

test('Should delete user account', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send().expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should no delete account for unauthorized user', async () => {
    await request(app).get('/users/me').send().request(401)
}) 

test('Should upload avatar image', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Pro'
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Pro')
})

test('Should not update invalid user fields', async () => {
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'Chennai'
    }).expect(400)
})