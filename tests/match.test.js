const request = require('supertest')
const app = require('../src/app')
const Match = require('../src/models/match')
const mongoose = require('mongoose')
const { userOneId, userTwoId, setupDatabase } = require('./fixtures/db')

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