const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const bodyparser = require('body-parser');
const cors = require('cors')
const helmet = require("helmet");
const morgan = require("morgan");
const path = require('path')
var cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

connectDB();

app.get('/', function(req, res){
  res.cookie('name', 'express').send('cookie set'); //Sets name = express
});

app.use('/public', express.static('public'));

app.use("/api/users", require('./routes/userRoute'));
app.use("/api/messages", require('./routes/messageRoute'));
app.use("/api/conversations", require('./routes/conversationRoute'));
app.use("/api/pictures", require('./routes/pictureRoute'));
app.use("/api/groupConversations", require('./routes/groupConversationRoute'));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}


app.listen(process.env.PORT || 5000, () => 
console.log(`server is running on port ${process.env.PORT || 5000}`)
);