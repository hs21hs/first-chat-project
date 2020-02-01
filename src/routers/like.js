const express = require('express')
const Like = require('../models/like')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/likes', auth, async (req, res) => {
    const like = new Like({
        sender: req.body.sender,
        reciever: req.body.reciever
    })

    try {
        await like.save()
        res.status(201).send(like)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router