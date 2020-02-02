const express = require('express')
const Dislike = require('../models/dislike')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/dislikes', auth, async (req, res) => {
    console.log('jj', req.body)
    const dislike = new Dislike({
        sender: req.body.sender,
        reciever: req.body.reciever
    })

    try {
        await dislike.save()
        res.status(201).send(dislike)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router