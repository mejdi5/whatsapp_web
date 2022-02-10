const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

firstName: {type: String,required: true},
lastName: {type: String, default: ""},
picture: {type: Object, default: null},
email: {type: String, required: true, unique: true, lowercase: true},
phoneNumber: {type: Number, required: true},
isAdmin: {type:Boolean, default: false}
},
{timestamp: true});

module.exports = User = mongoose.model('User', userSchema)