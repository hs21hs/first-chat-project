const request = require('supertest')
const app = require('../src/app')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const Message = require('../src/models/message')

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

test('should sign up new user', async () => {
    await request(app).post('/users').send({
        username: "fred",
        password: 'default123'
    }).expect(201)
})


test('should fail to sign up exsisting user', async () => {
    await request(app).post('/users').send({
        username: "haider",
        password: 'default123'
    }).expect(400)
})

test('should get all users except the current user', async () => {
    const currentUser = await User.findOne({_id: userOneId})
    
    const resp = await request(app).post('/getAllUsers')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
        currentUser
    }).expect(200)

    let currentUserExists = false

    resp.body.forEach((user) => {
        if(user._id===userOneId.toString()){ currentUserExists = true}
    })
    expect(currentUserExists).toBe(false)

})

test('A users newMessage attribute should read as true, if they have sent an unread message to current user', async () => {
    
    const currentUser = await User.findOne({_id: userOneId})
    
    const resp = await request(app).post('/getAllUsers')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
        currentUser
    }).expect(200)

    //defensivley
    let userTwoNewMsg = false
    resp.body.forEach((user) => {if(user._id===userTwoId.toString() && user.newMessage === true){ userTwoNewMsg = true}})
    
    expect(userTwoNewMsg).toBe(true)

    //loosely
    // let userTwoNewMsg = true
    // resp.body.forEach((user) => {if(user._id===userTwoId.toString() && user.newMessage === false){ userTwoNewMsg = false}})
    
    // expect(userTwoNewMsg).toBe(true)

})

test('A users newMessage attribute should read as false, if they have not sent an unread message to current user', async () => {
    
    const currentUser = await User.findOne({_id: userOneId})
    
    const resp = await request(app).post('/getAllUsers')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
        currentUser
    }).expect(200)

    let userThreeNewMsg = true
    resp.body.forEach((user) => {if(user._id===userThreeId.toString() && user.newMessage === false){ userThreeNewMsg = false}})
    
    expect(userThreeNewMsg).toBe(false)

})

//'/getAllUsers' shld get all users except the user id passed in req.body.currentUser._id
// that array of users should also contain new msg true for one and false for another appropriately

// '/users/login' shld respond 200 when existing user is passsed in req.body.currentUser._id
// '/users/login' shld respond 400 when non-existing user is passsed in req.body.currentUser._id




