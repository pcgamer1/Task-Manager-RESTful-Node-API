const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId
const userOne = {
    _id: userOneId, 
    name: 'Sarthak',
    email: 'saxenasarthak@gmail.com',
    password: 'sarthak',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}
const userTwoId = new mongoose.Types.ObjectId
const userTwo = {
    _id: userTwoId, 
    name: 'Sarthi',
    email: 'saxenasarthi@gmail.com',
    password: 'sarthak',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task 1',
    completed: false,
    owner: userOneId
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task 2',
    completed: true,
    owner: userOneId
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task 3',
    completed: true,
    owner: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await Task.deleteMany()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}