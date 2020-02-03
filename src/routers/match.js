const express = require('express')
const Like = require('../models/like')
const router = new express.Router()
const User = require('../models/user')
const Match = require('../models/match')
const auth = require('../middleware/auth')

router.post('/myMatches', auth, async (req, res) => {
   const myMatches = await Match.find({$or:[{userOne: req.user._id},{userTwo: req.user._id}]})
   .populate({ path: 'userOne'}).populate({ path: 'userTwo'});

   console.log('mymatches', myMatches)
    myMatchedUsers = myMatches.map((match) => {
        if (match.userOne._id.toString() === req.user._id.toString()){return match.userTwo}
        if (match.userTwo._id.toString() === req.user._id.toString()){return match.userOne}
    })
    console.log('mymatchedusers', myMatchedUsers)
    
    try {
        res.status(200).send(myMatchedUsers)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router