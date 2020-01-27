const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate(value){
            if (value === "0"){
                throw new Error('age must be validated')
            }
        }
    },
  
 
})

userSchema.virtual('sentMessages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'sender'
})
userSchema.virtual('recievedMessages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'reciever'
})

const User = mongoose.model('User', userSchema)

module.exports = User