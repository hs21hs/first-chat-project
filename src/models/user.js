const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Message = require('./message')
const Like = require('./like')
const Match= require('./match')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    image_url: {
        type: String,
        default: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12200707/lab-high-five-header.jpg"
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

  
 
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismytoken')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    
    await Message.deleteMany({$or:[{sender: user._id},{reciever: user._id}]})
    await Like.deleteMany({$or:[{sender: user._id},{reciever: user._id}]})
    await Match.deleteMany({$or:[{userOne: user._id},{userOne: user._id}]})

    next()
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