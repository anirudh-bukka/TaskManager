const mongoose = require('mongoose')

/* In Mongoose, model is a wrapper for the schema. So, if the schema defines the structure for a document 
    (like the type validations, etc.), then a mongoose model provides an interface to the database. 
    So, using the model we can CRUD our documents with great ease.
*/

// Setting up structure for the document(s)
const TaskSchema = new mongoose.Schema({
    // name: String, 
    // completed: Boolean
    name: {
        type: String,
        required: [true, 'Must provide a name.'],
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters.']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema) // model looks for name and the schema