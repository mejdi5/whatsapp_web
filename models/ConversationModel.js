const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({

    senderId: {
        type: String,
    },
    receiverId: {
        type: String,
    },
},
{timestamp: true}
);

module.exports = Conversation = mongoose.model('Conversation', ConversationSchema);