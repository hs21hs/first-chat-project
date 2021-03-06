const request = require('supertest')
const app = require('../src/app')
const Like = require('../src/models/like')
const User = require('../src/models/user')
const Match = require('../src/models/match')
const mongoose = require('mongoose')


const { userOneId,
    userOne,
    userTwoId,
    userTwo,
    userThreeId,
    userThree,
    setupDatabase } = require('./fixtures/db')

    beforeEach(setupDatabase)

test('should create a like, and should not contain .match (as there are no complimentary likes)', async () => {
    const currentUser = await User.findOne({_id: userOneId})

    const resp = await request(app)
    .post('/likes')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
       sender: userOneId,
       reciever: userTwoId
    }).expect(201)

    expect(resp.body.match).toBeFalsy()
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

test('two complimentary likes make a match', async () => {
    const likeOneId = new mongoose.Types.ObjectId()
    const likeOne = await new Like({
    _id: likeOneId,
    sender: userOneId,
    reciever: userThreeId
    }).save()

    const likeTwoId = new mongoose.Types.ObjectId()
    const likeTwo = await new Like({
    _id: likeTwoId,
    sender: userThreeId,
    reciever: userOneId
    }).save()

    const match = await Match.findOne({$or:[{userOne: userOneId, userTwo: userThreeId},{userOne: userThreeId, userTwo: userOneId}]})

    expect(match).toBeInstanceOf(Match)

})

test('two complementary likes should make a match and return an obj with .newMatch true', async () => {
    const currentUser = await User.findOne({_id: userOneId})

    await request(app)
    .post('/likes')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
       sender: userOneId,
       reciever: userTwoId
    })

    const resp = await request(app)
    .post('/likes')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
       sender: userTwoId,
       reciever: userOneId
    }).expect(201)

    expect(resp.body.match).toBeTruthy()
})