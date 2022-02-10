const router = require('express').Router();
const GroupConversation = require('../models/GroupConversationModel');


//post new conversation
router.post("/", async (req, res)=> {
    const newGroupConversation = new GroupConversation(req.body)
    try { 
        const savedGroupConversation = await newGroupConversation.save()
        res.status(200).json(savedGroupConversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get group conversations of one user
router.get("/:userId", async (req, res)=> {
    try {
        const userGroupConversations = await GroupConversation.find({members: { $in: [
            req.params.userId
        ] }})
        res.status(200).json(userGroupConversations)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;