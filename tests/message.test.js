const request = require('supertest')
const app = require('../src/app')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const Message = require('../src/models/message')
// '/currentMessages' shld get all messages between 2 users
//req.body.currentUser._id, req.body.chatPartner._id


// '/messages' shld return 200 when passed with all attributes
//     text:req.body.text,
//     sender: req.body.sender,
//     reciever: req.body.reciever

// '/messages' shld return 400 when missing an attribute
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'haider',
    password: 'default123'
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    username: 'alex',
    password: 'default123'
}

const userThreeId = new mongoose.Types.ObjectId()
const userThree = {
    _id: userThreeId,
    username: 'roach',
    password: 'default123'
}

const messageOneId = new mongoose.Types.ObjectId()
const messageOne = {
    _id: messageOneId,
    text: 'an unread test msg from alex to haider',
    sender: userTwoId,
    reciever: userOneId
}

const messageTwoId = new mongoose.Types.ObjectId()
const messageTwo = {
    _id: messageTwoId,
    text: 'a read test msg from roach to haider',
    sender: userThreeId,
    reciever: userOneId,
    read: true
}

beforeEach(async () => {
    await User.deleteMany()
    await Message.deleteMany()
    
    const u1 = await new User(userOne).save()
    await u1.generateAuthToken()
    const u2 = await new User(userTwo).save()
    await u2.generateAuthToken()
    const u3 = await new User(userThree).save()
    await u3.generateAuthToken()
    await new Message(messageOne).save()
    await new Message(messageTwo).save()
})

test('should fail to create a msg with same user and sender', async () => {
    const user1 = await User.findById(userOneId)
    await request(app).post('/messages').send({
        text: "same sender nd reciever",
        sender: user1._id,
        reciever: user1._id
    }).expect(400)
})