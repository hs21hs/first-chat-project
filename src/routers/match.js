const express = require('express')
const Like = require('../models/like')
const router = new express.Router()
const User = require('../models/user')
const Match = require('../models/match')
const Message = require('../models/message')
const auth = require('../middleware/auth')

router.post('/myMatches', auth, async (req, res) => {
   const myMatches = await Match.find({$or:[{userOne: req.user._id},{userTwo: req.user._id}]})
   .populate({ path: 'userOne'}).populate({ path: 'userTwo'});

   console.log("mymatches",myMatches)
    myMatchedUsers = myMatches.map((match) => {
        if (match.userOne._id.toString() === req.user._id.toString()){
            const matchObj = match.toObject()
            const opened = matchObj.userOneOpened
            matchObj.userTwo.openedMatch = opened
            
            return matchObj.userTwo
        }
        if (match.userTwo._id.toString() === req.user._id.toString()){
            const matchObj = match.toObject()
            const opened = matchObj.userTwoOpened
            matchObj.userOne.openedMatch = opened
            
            return matchObj.userOne
        }
    })
    
    //getmumatches will check each user and see if they have sent any unread msgs to me, if so do user.newMessage = true
    const matchedUsersWithNewMsgKey = myMatchedUsers.map(async (user) => {
        const couplesMessage = await Message.findOne({reciever: req.user._id, sender: user._id.toString(), read: false})
        if(couplesMessage){
            user.newMessage = true
        }
        return user
    }) 
    const final = await Promise.all(matchedUsersWithNewMsgKey)
    console.log('mmmmmm',final)

    try {
        res.status(200).send(final)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router