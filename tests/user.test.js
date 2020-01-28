const request = require('supertest')
const app = require('../src/app')

test('should sign up new user', async () => {
    await request(app).post('/users').send({
        username: "newTtry13"
    }).expect(201)
})
