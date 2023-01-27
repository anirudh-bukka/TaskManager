const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Middleware
app.use(express.static('./public'))
app.use(express.json())

// Routes
    // now we have to send JSON data to the app (req.body), so we need to use a middleware --> express.json()
    // Root route for the "Tasks" router
app.use('/api/v1/tasks', tasks)  
app.use(notFound)
app.use(errorHandlerMiddleware)

// const port = 3000
const port = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI) // passing in the string coming in from the .env file.
        app.listen(port, console.log(`Server is listening on port ${port} ...`))
    } catch(error) {
        console.log(error)
    }
}

start()


/* **********************************************************************

function makeRequest(location) {
    return new Promise((resolve, reject) => {
        console.log(`Making a request to ${location}`)
        if(location === 'Google') {
            resolve('Google says hi')
        } else {
            reject('Can only communicate with Google')
        }
    })
}

function processRequest(response) {
    return new Promise((resolve, reject) => {
        console.log('Processing response')
        resolve(`Extra information + ${response}`)
    })
}

async function doWork() {
    try {
        const response = await makeRequest('Google')
        console.log('Response Received')
        const processedResponse = await processRequest(response)
        console.log(processedResponse)
    } catch (error) {
        console.log(error)
    }
}

doWork()

********************************************************************** */