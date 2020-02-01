const request = require('supertest')
const app = require('../src/app')
const Match = require('../src/models/match')
const mongoose = require('mongoose')
const { matchOne,
    setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('should create a match', async () => {
    const m = await new Match(matchOne).save()
    expect(m).toBeInstanceOf(Match)
})

test('should not create a match with ones self', async () => {
    
    
    let r = null
    try {
        await new Match(matchOne).save()
    }catch(e){
        r = e
    }
    expect(r).toBeTruthy()
    
})