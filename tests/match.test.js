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
    const matchOneId = new mongoose.Types.ObjectId()
    
    const matchOne = {
    _id: matchOneId,
    userOne: userOneId,
    userTwo: userOneId
    }
    
    let r = null
    try {
        await new Match(matchOne).save()
    }catch(e){
        r = e
    }
    expect(r).toBeTruthy()
    
})