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
        enum: ['user', 'manager', 'admin'],
        default: 'user',
        required: true
    }
})

//encryption middleware
UserSchema.pre(
    'save',
    async function (next) {
        
        const user = this
        if (!user.isModfied('password')) return next()

        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    }
)

const User = mongoose.model('User', UserSchema);

module.exports = {User}