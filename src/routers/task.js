const express = require('express')
const router = new express.Router()
const Task = require('../modules/task')

router.use(express.json())

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send()
    } catch(e) {
        res.status(400).send()
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    updates = Object.keys(req.body)
    allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({ error: 'Invalid updates' })
    }
    try {
        const task = await Task.findById(_id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router