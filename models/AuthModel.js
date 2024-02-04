const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    access: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
})

const Auth = mongoose.model('Auth', AuthSchema);

module.exports = {Auth}