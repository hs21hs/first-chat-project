const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Message = require('../models/message')
//const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
   
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
    
    const readUsers = filteredUsers.map(async (user) => {
        
        const tes = await Message.find({reciever: req.body.currentUser._id, sender: user._id.toString()})
       
        tes.forEach( (msg) => {
            if (msg.read === false){
                
                user.newMessage = true}
        })
        return user
    }) 
    
    const final = await Promise.all(readUsers)

    try {
        res.status(200).send(final)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router