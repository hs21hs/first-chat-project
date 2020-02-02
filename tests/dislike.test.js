const request = require('supertest')
const app = require('../src/app')
const Dislike = require('../src/models/dislike')
const User = require('../src/models/user')
const mongoose = require('mongoose')

const { userOneId,
    userOne,
    userTwoId,
    userTwo,
    userThreeId,
    userThree,
    setupDatabase } = require('./fixtures/db')

    beforeEach(setupDatabase)

test('should create a dislike', async () => {
    const currentUser = await User.findOne({_id: userOneId})

    await request(app)
    .post('/dislikes')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
       sender: userOneId,
       reciever: userTwoId
    }).expect(201)
})


test('should fail to create a dislike sent to ones self', async () => {
    const currentUser = await User.findOne({_id: userOneId})
    
    await request(app).post('/dislikes')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
      sender: userOneId,
      reciever: userOneId
    }).expect(400)
})