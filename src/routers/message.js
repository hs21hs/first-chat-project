const express = require('express')
const Message = require('../models/message')
const Match = require('../models/match')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/messages', auth, async (req, res) => {
    const message = new Message({
        text:req.body.text,
        sender: req.user.sender,
        reciever: req.body.reciever
    })

    try {
        await message.save()
        res.status(201).send(message)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/currentMessages', auth, async (req, res) => {
    try {
        await Message.updateMany({ 
            reciever: req.user._id, 
            sender: req.body.chatPartner._id }, {
            read:true
        });

        const toUpdate = req.body.chatPartner.loggedInUserIs + "Opened"
        console.log('tt',req.body.chatPartner.match_id)

        const um = await Match.updateOne({ 
            _id: req.body.chatPartner.match_id},{
            [toUpdate]: true
        });
        console.log('um ',um)
        const msgs = await Message.find().populate({ path: 'sender'}).populate({ path: 'reciever'});
        
        const filteredMsgs = msgs.filter((msg) => {
            if(msg.sender._id.toString() === req.user._id && msg.reciever._id.toString() === req.body.chatPartner._id){return true}
            if(msg.sender._id.toString() === req.body.chatPartner._id && msg.reciever._id.toString() === req.body.currentUser._id){return true}
            else{return false}
        })
        
        res.status(200).send(filteredMsgs)
    } catch (e) {
        res.status(400).send(e)
    }

//get all the msgs that belong to the 2 user ds in the req 
    // const cu = await User.findById(req.body.currentUser)
    //     console.log(cu)
    //     await cu.populate('sentMessages').execPopulate()
    //     await cu.populate('recievedMessages').execPopulate()
    //     console.log(cu.sentMessages)
    //     console.log(cu.recievedMessages)
  
})





module.exports = router