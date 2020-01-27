const mongoose = require('mongoose')

const Message = mongoose.model('Message', {
    text: {
        type: String,
        required: true,
        trim: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
    // read: {
    //     type: Boolean,
    //     default: false,
    //     ref: 'User'
    // }
})

module.exports = Message