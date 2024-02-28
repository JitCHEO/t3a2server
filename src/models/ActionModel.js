const mongoose = require('mongoose')

const ActionSchema = new mongoose.Schema({
    
    message: {
        type: String,
        require: true
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User', required: true
    },
    timestamp: {
        type: Date, default: Date.now 
    }
})

const Action = mongoose.model('Action', ActionSchema)

module.exports = {
    Action
}