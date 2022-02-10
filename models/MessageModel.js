const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    conversation: {
        type: String,
    },
    sender: {
        type: String
    }, 
    text: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
},{timestamp: true});

module.exports = Message = mongoose.model('Message', messageSchema)