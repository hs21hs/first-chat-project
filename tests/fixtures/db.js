const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Message = require('../../src/models/message')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'haider',
    password: 'default123',
    email: "haider@hotmail.com",
    breed: "labrador",
    age: 4,
    img_ur: "https://3apq7g38q3kw2yn3fx4bojii-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/dog-owner-750x501.jpeg"
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    username: 'alex',
    password: 'default123',
    email: "alex@hotmail.com",
    breed: "pit",
    age: 4,
    img_ur: "https://3apq7g38q3kw2yn3fx4bojii-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/dog-owner-750x501.jpeg"
}

const userThreeId = new mongoose.Types.ObjectId()
const userThree = {
    _id: userThreeId,
    username: 'roach',
    password: 'default123',
    email: "roach@hotmail.com",
    breed: "dob",
    age: 4,
    img_ur: "https://3apq7g38q3kw2yn3fx4bojii-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/dog-owner-750x501.jpeg"
}

const messageOneId = new mongoose.Types.ObjectId()
const messageOne = {
    _id: messageOneId,
    text: 'an unread test msg from alex to haider',
    sender: userTwoId,
    reciever: userOneId
}

const messageTwoId = new mongoose.Types.ObjectId()
const messageTwo = {
    _id: messageTwoId,
    text: 'a read test msg from roach to haider',
    sender: userThreeId,
    reciever: userOneId,
    read: true
}

const setupDatabase = async() => {
    await User.deleteMany()
    await Message.deleteMany()
    const u1 = await new User(userOne).save()
    await u1.generateAuthToken()
    const u2 = await new User(userTwo).save()
    await u2.generateAuthToken()
    const u3 = await new User(userThree).save()
    await u3.generateAuthToken()
    await new Message(messageOne).save()
    await new Message(messageTwo).save()
}


module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    userThreeId,
    userThree,
    messageOneId,
    messageOne,
    messageTwoId,
    messageTwo,
    setupDatabase
}