const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    }, 
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    }
},{ collection: 'users'})


module.exports = mongoose.model('users', userSchema )