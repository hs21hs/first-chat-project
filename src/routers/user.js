const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Message = require('../models/message')
const Like = require('../models/like')
const Dislike = require('../models/dislike')
const Match = require('../models/match')
const auth = require('../middleware/auth')
const mongoose = require('mongoose')

router.post('/users', async (req, res) => {
    
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/users', auth, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.user._id},
            req.body, 
            {new: true,
            useFindAndModify: false},
        )
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/getSwipeUsers', auth, async (req, res) => {

    const allUsers = await User.find()

    const filteredOutCurrentUser = allUsers.filter((user) => {
        if (user._id.toString() === req.user._id.toString()){return false}else{return true}
    })
    //console.log('ff',filteredOutCurrentUser)
    
    const promisesWithSwipedData = filteredOutCurrentUser.map(async (user) => {
        const like = await Like.findOne({sender: req.user._id, reciever: user._id})
        const dislike = await Dislike.findOne({sender: req.user._id, reciever: user._id})
        const match = await Match.findOne({$or:[{userOne: req.user._id, userTwo: user._id},{userOne: user._id, userTwo: req.user._id}]})
        return ({user,like,dislike,match})
        
    })
    const usersWithSD = await Promise.all(promisesWithSwipedData)
    //console.log('lff',usersWithSD)

    const usersToBeFiltered = usersWithSD.map((obj) => {
        if(obj.match || obj.like || obj.dislike){return null}else{return obj.user}
    })
    //console.log('utbf',usersToBeFiltered)
    const finalUsersAr = usersToBeFiltered.filter((user) => {
        if(user){return true}else{return false}
    })
    //console.log('final',finalUsersAr)

    try {
        res.status(200).send(finalUsersAr)
    } catch (e) {
        res.status(400).send(e)
    }
})



router.post('/getAllUsers', auth, async (req, res) => {

    const allUsers = await User.find()

    const filteredUsers = allUsers.filter((user) => {
        if (user._id.toString() === req.user._id.toString()){return false}else{return true}
    })
    
    const readUsers = filteredUsers.map(async (user) => {
        const couplesMessages = await Message.find({reciever: req.user._id, sender: user._id.toString()})
        couplesMessages.forEach( (msg) => {
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