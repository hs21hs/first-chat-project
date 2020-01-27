const express = require('express')
const router = new express.Router()
const User = require('../models/user')
//const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    console.log(user)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
   
    const user = await User.findOne(req.body)
    try {
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/getAllUsers', async (req, res) => {

    allUsers = await User.find()

    const filteredUsers = allUsers.filter((user) => {
        if (user._id.toString() === req.body.currentUser._id){return false}else{return true}
    })
    
    try {
        res.status(200).send(filteredUsers)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router