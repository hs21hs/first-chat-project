const request = require('supertest')
const app = require('../src/app')
const Match = require('../src/models/match')
const User = require('../src/models/user')
const Like = require('../src/models/like')
const mongoose = require('mongoose')
const { userOneId, userTwoId, userThreeId, userFourId, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('should create a match', async () => {
    const matchOneId = new mongoose.Types.ObjectId()

    const matchOne = {
        _id: matchOneId,
        userOne: userOneId,
        userTwo: userTwoId
    }

    const m = await new Match(matchOne).save()
    expect(m).toBeInstanceOf(Match)
})

test('should not create a match with ones self', async () => {
    
    const selfMatchId = new mongoose.Types.ObjectId()

    const selfMatch = {
    _id: selfMatchId,
    userOne: userOneId,
    userTwo: userOneId
    }

    let r = null
    try {
        await new Match(selfMatch).save()
    }catch(e){
        r = e
    }
    expect(r).toBeTruthy()
    
})

test('should get all current users matches', async () => {
    const currentUser = await User.findOne({_id: userOneId})

    const matchOneId = new mongoose.Types.ObjectId()
    const matchOne = await new Match({
    _id: matchOneId,
    userOne: userOneId,
    userTwo: userTwoId
    }).save()

    const matchTwoId = new mongoose.Types.ObjectId()
    const matchTwo = await new Match({
    _id: matchTwoId,
    userOne: userOneId,
    userTwo: userFourId
    }).save()
     
    const matchThreeId = new mongoose.Types.ObjectId()
    const matchThree = await new Match({
    _id: matchThreeId,
    userOne: userTwoId,
    userTwo: userFourId
    }).save()

    const resp = await request(app)
    .post('/myMatches')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .expect(200)
    
    console.log("resp of my mattces",resp.body)

    expect(resp.body.length).toEqual(2)
    //expect(resp.body).toEqual(expect.arrayContaining([matchOne,matchTwo]))
})

// test('cannot create same match twice', async () => {
//     const currentUser = await User.findOne({_id: userOneId})

//     const matchOneId = new mongoose.Types.ObjectId()
//     const matchOne = await new Match({
//     _id: matchOneId,
//     userOne: userOneId,
//     userTwo: userTwoId
//     }).save()

//     const matchTwoId = new mongoose.Types.ObjectId()
//     const matchTwo = await new Match({
//     _id: matchTwoId,
//     userOne: userOneId,
//     userTwo: userTwoId
//     }).save().catch((e) => {
//         expect(e)
//     })
// })