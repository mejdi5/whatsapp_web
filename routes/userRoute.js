let express = require('express')
let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
let router = express.Router();
const User = require('../models/UserModel');


const isAuth = require('../middlewares/isAuth');

const {
  validator,
  registerRules,
  loginRules,
} = require('../middlewares/validator');



//Register new user
router.post('/register', registerRules(), validator,  async (req, res, next) => {
  try {    
    // Check for existing user
    let user = await User.findOne({ email: req.body.email, phoneNumber: req.body.phoneNumber });  
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    } 

    // Create new User
    user = await new User({ 
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName, 
      phoneNumber: req.body.phoneNumber, 
      email: req.body.email,
      isAdmin: req.body.isAdmin
    });
    
    const result = await user.save()
    const payload = {id: result._id};
    const token = jwt.sign(payload, process.env.secretOrKey);

    res.status(200).json(
      { msg: 'User registred with success', result, token }
      )

  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Server Error', error });
  }
});




// Login User
router.post('/login', loginRules(), validator, async (req, res) => {
  const { email, phoneNumber } = req.body;
  try {
    
    // Check for existing user
    let user = await User.findOne({ email, phoneNumber });
    if (!user) {
      return res.status(400).json({ msg: 'email or phone number incorrect' });
    }
    
    // sign user
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.secretOrKey);

    res.status(200).json({ msg: 'Logged in with success', user, token });
  
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});


//Get authentified user
router.get('/authUser', isAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});


//get users
router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

//get one user
router.get('/user/:_id', async (req, res) => {
  const {_id}  = req.params;
  try {
    const user = await User.findOne({_id});
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});



// delete a user
router.delete('/delete/:_id', async (req, res) => {
  const  _id  = req.params._id;
  try {
    const user = await User.findOneAndDelete({ _id });
    res.json({ msg: "user deleted", user });
  } catch (error) {
    console.log(error);
  }
});

//edit a user
router.put("/update/:_id", async (req, res) => {

  const { _id } = req.params;
  const {firstName, lastName, email, phoneNumber, picture} = req.body
  
  try {
    const user = await User.findByIdAndUpdate(_id, {firstName, lastName, email, phoneNumber, picture});
    console.log(user)
    res.json({ msg: "user edited", user});
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;