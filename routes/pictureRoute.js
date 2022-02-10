let express = require('express')
let mongoose = require('mongoose');
let router = express.Router();
let uuidv4 = require('uuid/v4'); 
let multer = require('multer');
const Picture = require('../models/PictureModel');


//post new picture
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
}
});

var upload = multer({ storage: storage, });

router.post('/upload', upload.single('image'), async (req, res, next) => {

    try { 
    const url = req.protocol + '://' + req.get('host')
    const path = url + '/public/' + req.file.filename

    const newPicture = new Picture({
        _id: mongoose.Types.ObjectId(),
        path})
    const picture = await newPicture.save()
    console.log('picture', picture);
    
    res.status(201).json({
        msg: "Picture Uploaded",
        picture
    })

    } catch (error) {
    console.log('Server error',error),
        res.status(500).json(error);
    }  
})


//get picture of a user
router.get("/:userId", async (req, res)=> {
    try {
        const picture = await Picture.find({
            owner: req.params.userId
        })
        res.status(200).json(picture)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete picture
router.delete('/delete/:picturepath', async (req, res) => {
    const  _path  = req.params.picturepath;
    try {
    const picture = await Picture.findOneAndDelete({ _path });
    res.json({ msg: "picture deleted", picture });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
