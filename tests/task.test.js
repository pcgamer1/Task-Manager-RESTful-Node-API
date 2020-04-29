const request = require('supertest')
const app = require('../src/app')
const { userTwo, userOne, taskOne, setupDatabase } = require('./fixtures/db')
const Task = require('../src/models/task')

beforeEach(setupDatabase)

test('Should create a task for user', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'From test'
    })
    .expect(201)

    const task = Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('Should fetch tasks for userOne', async () => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toBe(2)
})

test('Should not allow userTwo to delete taskOne', async () => {
    await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})