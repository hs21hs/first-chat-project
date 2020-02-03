const express = require('express')
const Like = require('../models/like')
const router = new express.Router()
const User = require('../models/user')
const Match = require('../models/match')
const auth = require('../middleware/auth')

router.post('/likes', auth, async (req, res) => {
    const like = new Like({
        sender: req.body.sender,
        reciever: req.body.reciever
    })

    try {
        await like.save()
        
        
        const match = await Match.findOne({$or:[{userOne: like.sender, userTwo: like.reciever},{userOne: like.reciever, userTwo: like.sender}]})
       
        const likeObj = like.toObject()
        if (match){
            likeObj.match = match
        }

        res.status(201).send(likeObj)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router