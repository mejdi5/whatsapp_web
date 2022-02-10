const mongoose = require('mongoose');

require('dotenv').config({ path: './config/.env' });

const connectDB = async () => {
  
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect('mongodb+srv://mejdi:abcdefgh@cluster0.s6ks3.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;