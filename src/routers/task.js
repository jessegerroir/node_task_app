const express = require('express');
const router = new express.Router();

const Task = require('../models/tasks');

// load in auth middleware
const auth = require('../middleware/auth');
const { request } = require('express');



router.post('/tasks', auth, async (request, response) => {

    // Add owner id to task
    const task = new Task({
        ...request.body,
        owner: request.user._id
    });

    try {
        await task.save();
        response.status(201).send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});


// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks/', auth, async (request, response) => {
    // get filter values from url
    const match = {};
    const sort = {};
    
    if (request.query.completed) {
        match.completed = request.query.completed === 'true';
    }

    if (request.query.sortBy) {
        const parts = request.query.sortBy.split('_');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        // Gets all the tasks belonging to the user (via foriegn key)
        // But first filters them
        // before populating the array
        await request.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(request.query.limit),
                skip: parseInt(request.query.skip),
                sort
            }
        }).execPopulate();

        response.send(request.user.tasks);
    } catch (error) {
        response.status(500).send(error);
    }
});


router.get('/tasks/:id', auth, async (request, response) => {
    const _id = request.params.id;
    try {

        // Make sure the task they want is one they created
        const task = await Task.findOne({ 
            _id, 
            owner: request.user._id  
        });
        
        if(!task){
            return response.status(404).send();
        }
        response.send(task);
    } catch (error) {
        response.status(500).send(error);
    }
});


router.patch('/tasks/:id', auth, async (request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['name', 'description', 'completed'];
    const isValid = updates.every((update) =>  allowedUpdates.includes(update));

    if (!isValid) {
        return response.status(400).send({ error: 'invalid updates!'});
    }

    try {
        
        const task = await Task.findOne({
            _id: request.params.id,
            owner: request.user._id
        });

        if (!task) {
            return response.status(404).send();
        }

        updates.forEach((key) => task[key] = request.body[key]);
        await task.save();

        response.send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});


router.delete('/tasks/:id', auth, async (request, response) => {
    try {
        // search task by user
        const task = await Task.remove({
            _id: request.params.id,
            owner: request.user._id
        });

        // if (task) {
        //     return response.status(404).send({message: "Task has already been deleted"});
        // }

        response.status(200).send({message: "Task deleted"});
    } catch (error) {
        response.status(500).send(error);
    }
})

module.exports = router;