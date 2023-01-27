const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

/* Async wrappers are more ideal to use, because async operations and eventhough it is very useful to use these try-catch blocks, it becomes redundant.
    So it is better to create a middleware function that will wrap our controllers in which we will setup functionality to not repeat ourselves.
*/

const getAllTasks = asyncWrapper(async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
})

const getSingleTask = asyncWrapper(async (req, res) => {
    // res.send('Get One Tasks')
        const { id: taskId } = req.params
        const tasks = await Task.findOne({ _id: taskId }) // _id matches to the one in params
        if(!tasks) {
            return res.status(404).json({ msg: `No task with id: ${ taskId }` }) // use return, because we want to terminate this func when none found.
        }
        res.status(200).json({ tasks })

    // res.json({ id: req.params.id }) // since id is in the params
})

const createTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
        const { id: taskId } = req.params
        const tasks = await Task.findOneAndDelete({ _id: taskId })
        if(!taskId) {
            res.status(404).json({ msg: `No task with id: ${taskId}` })
        }
        res.status(200).json({ taskId })
    // res.send('Delete Task')
})

const updateTask = asyncWrapper(async (req, res) => {
        const { id: taskId } = req.params
        const tasks = await Task.findOneAndUpdate({ _id: taskId }, req.body, {new:true, runValidators: true})
        if(!tasks) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` })
        }
        res.status(200).json({ id: taskId, data: req.body })
})

module.exports = { getAllTasks, getSingleTask, createTask, updateTask, deleteTask }


/* ****************************************************************************
WITHOUT ASYNC WRAPPER
**********************

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getSingleTask = async (req, res) => {
    // res.send('Get One Tasks')
    try {
        const { id: taskId } = req.params
        const tasks = await Task.findOne({ _id: taskId }) // _id matches to the one in params
        if(!tasks) {
            return res.status(404).json({ msg: `No task with id: ${ taskId }` }) // use return, because we want to terminate this func when none found.
        }
        res.status(200).json({ tasks })
    } catch(error) {
        res.status(500).json({ msg: error })
    }
    // res.json({ id: req.params.id }) // since id is in the params
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({msg: error})    
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params
        const tasks = await Task.findOneAndDelete({ _id: taskId })
        if(!taskId) {
            res.status(404).json({ msg: `No task with id: ${taskId}` })
        }
        res.status(200).json({ taskId })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
    // res.send('Delete Task')
}

const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params
        const tasks = await Task.findOneAndUpdate({ _id: taskId }, req.body, {new:true, runValidators: true})
        if(!tasks) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` })
        }
        res.status(200).json({ id: taskId, data: req.body })
    } catch(error) {
        res.status(500).json({ msg: error })
    }
}

****************************************************************************
*/