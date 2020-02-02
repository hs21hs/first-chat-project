const request = require('supertest')
const app = require('../src/app')
const Like = require('../src/models/like')
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

test('should create a like', async () => {
    const currentUser = await User.findOne({_id: userOneId})

    await request(app)
    .post('/likes')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
       sender: userOneId,
       reciever: userTwoId
    }).expect(201)
})


test('should fail to create a like sent to ones self', async () => {
    const currentUser = await User.findOne({_id: userOneId})
    
    await request(app).post('/likes')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
      sender: userOneId,
      reciever: userOneId
    }).expect(400)
})

