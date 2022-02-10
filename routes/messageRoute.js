const router = require('express').Router();
const Message = require('../models/MessageModel');


//post new message
router.post("/", async (req, res)=> {
    const newMessage = new Message(req.body)
    const CheckMessage = await Message.find({
        _id: newMessage._id
    }) 
    try {
        if (CheckMessage.length > 0) {
            return res.status(400).json('message already exists')
        } 
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get messages of a conversation
router.get("/:conversationId", async (req, res)=> {
    try {
        const msgs = await Message.find({
            conversation: req.params.conversationId,
        })
        const messages = msgs.filter(m => m.conversation !== undefined)
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get one message
router.get('/message/:_id', async (req, res) => {
    const {_id}  = req.params;
    try {
    const message = await Message.findOne({_id});
    res.json(message);
    } catch (error) {
    console.log(error);
    }
});


// delete a message
router.delete('/delete/:messageId', async (req, res) => {
    const  _id  = req.params.messageId;
    try {
    const message = await Message.findOneAndDelete({ _id });
    res.json({ msg: "message deleted", message });
    } catch (error) {
    console.log(error);
    }
});

module.exports = router;