const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname : {
        type: String,
        required:true,
    },
    lname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    auth: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth'
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = {User}