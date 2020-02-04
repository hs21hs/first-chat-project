const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Message = require('../src/models/message')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

//currentmesages shld set that msg to read and that match to opened

test('should fail to create a msg with same user and sender', async () => {
    const currentUser = await User.findOne({_id: userOneId})
    await request(app).post('/messages')
    .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
    .send({
        text: "same sender nd reciever",
        reciever: userOne._id
    }).expect(400)
})

// test('should get back all messages between you and the given user(updated as read), and set the opened value of your match with that user as true', async () => {
//     const currentUser = await User.findOne({_id: userOneId})
//     await request(app).post('/currentMessages')
//     .set('Authorization', (`Bearer ${currentUser.tokens[0].token}`))
//     .send({
//         text: "same sender nd reciever",
//         reciever: userOne._id
//     }).expect(400)
// })

// // '/messages' shld return 200 when passed with all attributes
// //     text:req.body.text,
// //     sender: req.body.sender,
// //     reciever: req.body.reciever

// // '/messages' shld return 400 when missing an attribute
// // const userOneId = new mongoose.Types.ObjectId()
// // const userOne = {
// //     _id: userOneId,
// //     username: 'shaider',
// //     password: 'default123'
// // }




