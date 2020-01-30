const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
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
        },
        read: {
            type: Boolean,
            default: false,
            ref: 'User'
        }
})



messageSchema.pre('save', async function (next) {
    const message = this
   
    if (message.sender._id.toString() === message.reciever._id.toString()) {
        throw new Error("cannot send a msg to ones self")
    } else { next()}

    
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message