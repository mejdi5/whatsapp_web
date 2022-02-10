const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupConversationSchema = new Schema({

    members: {
        type: Array,
    },
},
{timestamp: true}
);

module.exports = GroupConversation = mongoose.model('GroupConversation', GroupConversationSchema);