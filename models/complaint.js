const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complain: {
        type: String,
        required: true
    },
    complain_description:{
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true,
        default: "user"
    }, 
    status: {
        type: String,
        required: true,
        default: "New"
    }, 
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    }
})


module.exports = mongoose.model('complaints', complaintSchema )