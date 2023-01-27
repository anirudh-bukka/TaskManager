const express = require('express')
const router = express.Router()
const { getAllTasks, getSingleTask, createTask, updateTask, deleteTask } = require('../controllers/tasks')

// router.route('/').get((req, res) => {
//     res.send('All Items')
// }) // ----> We place this `get` logic in controllers' tasks.js

router.route('/').get(getAllTasks)
router.route('/').post(createTask)
router.route('/:id').get(getSingleTask)
router.route('/:id').patch(updateTask)
router.route('/:id').delete(deleteTask)


module.exports = router