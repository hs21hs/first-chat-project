const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Message = require('../src/models/message')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('should fail to create a msg with same user and sender', async () => {
    //const user1 = await User.findById(userOneId)
    //console.log(userOne,"userOne")
    await request(app).post('/messages').send({
        text: "same sender nd reciever",
        sender: userOne._id,
        reciever: userOne._id
    }).expect(400)
})

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




