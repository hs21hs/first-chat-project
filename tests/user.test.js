const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Message = require('../src/models/message')
const Like = require('../src/models/like')
const Match= require('../src/models/match')

const { userOneId,
    userOne,
    userTwoId,
    userTwo,
    userThreeId,
    userThree,
    messageOneId,
    messageOne,
    messageTwoId,
    messageTwo,
    setupDatabase } = require('./fixtures/db')
    
beforeEach(setupDatabase)

test('should sign up new user', async () => {
    await request(app).post('/users').send({
        username: "fred",
        password: 'default123',
        email: "fred@hotmail.com",
        breed: "labrador",
        age: 4,
        img_ur: "https://3apq7g38q3kw2yn3fx4bojii-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/dog-owner-750x501.jpeg"
    }).expect(201)
})


test('should fail to sign up exsisting user', async () => {
    await request(app).post('/users').send({
        username: "haider",
        password: 'default123',
        email: "haider@hotmail.com",
    breed: "labrador",
    age: 4,
    img_ur: "https://3apq7g38q3kw2yn3fx4bojii-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/dog-owner-750x501.jpeg"
    }).expect(400)
})

test('should update exsisting user details', async () => {
    const currentUser = await User.findOne({_id: userOneId})

    const resp = await request(app).patch('/users')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
        username: "shaider",
        age: 6
    }).expect(200)
    expect(resp.body).toEqual(expect.objectContaining({username: "shaider",age: 6}))
    })
    
test('should delete all matches likes and messages of that user', async () => {
    
    const currentUser = await User.findOne({_id: userOneId})

    await request(app).delete('/users')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .expect(200)
    const user = await User.findOne({_id: currentUser._id})
    expect(user).toEqual(null)

    const messages = await Message.find({$or:[{sender: userOneId},{reciever: userOneId}]})
    const likes = await Like.find({$or:[{sender: userOneId},{reciever: userOneId}]})
    const matches = await Match.find({$or:[{userOne: userOneId},{userTwo: userOneId}]})
    
    expect(messages.length).toEqual(0)
    expect(likes.length).toEqual(0)
    expect(matches.length).toEqual(0)
})
// test('should get all users except the current user', async () => {
//     const currentUser = await User.findOne({_id: userOneId})
//     const resp = await request(app)
//     .post('/getAllUsers')
//     .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
//     .send({
//         currentUser
//     }).expect(200)
//     let currentUserExists = false

//     resp.body.forEach((user) => {
//         if(user._id===userOneId.toString()){ currentUserExists = true}
//     })
//     expect(currentUserExists).toBe(false)

// })

// test('A users newMessage attribute should read as true, if they have sent an unread message to current user', async () => {
    
//     const currentUser = await User.findOne({_id: userOneId})
    
//     const resp = await request(app).post('/getAllUsers')
//     .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
//     .send({
//         currentUser
//     }).expect(200)

//     //defensivley
//     let userTwoNewMsg = false
//     resp.body.forEach((user) => {if(user._id===userTwoId.toString() && user.newMessage === true){ userTwoNewMsg = true}})
    
//     expect(userTwoNewMsg).toBe(true)

//     //loosely
//     // let userTwoNewMsg = true
//     // resp.body.forEach((user) => {if(user._id===userTwoId.toString() && user.newMessage === false){ userTwoNewMsg = false}})
    
//     // expect(userTwoNewMsg).toBe(true)

// })

// test('A users newMessage attribute should read as false, if they have not sent an unread message to current user', async () => {
    
//     const currentUser = await User.findOne({_id: userOneId})
    
//     const resp = await request(app).post('/getAllUsers')
//     .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
//     .send({
//         currentUser
//     }).expect(200)

//     let userThreeNewMsg = true
//     resp.body.forEach((user) => {if(user._id===userThreeId.toString() && user.newMessage === false){ userThreeNewMsg = false}})
    
//     expect(userThreeNewMsg).toBe(false)

// })




//'/getAllUsers' shld get all users except the user id passed in req.body.currentUser._id
// that array of users should also contain new msg true for one and false for another appropriately

// '/users/login' shld respond 200 when existing user is passsed in req.body.currentUser._id
// '/users/login' shld respond 400 when non-existing user is passsed in req.body.currentUser._id




