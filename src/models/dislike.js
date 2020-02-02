const mongoose = require('mongoose')

const dislikeSchema = new mongoose.Schema({
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
})

dislikeSchema.pre('save', async function (next) {
    const dislike = this
   
    if (dislike.sender._id.toString() === dislike.reciever._id.toString()) {
        throw new Error("cannot send a dislike to ones self")
    } else { next()}

})

const dislike = mongoose.model('Dislike', dislikeSchema)

module.exports = dislike