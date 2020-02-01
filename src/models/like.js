const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
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



likeSchema.pre('save', async function (next) {
    const like = this
   
    if (like.sender._id.toString() === like.reciever._id.toString()) {
        throw new Error("cannot send a like to ones self")
    } else { next()}

})

const like = mongoose.model('Like', likeSchema)

module.exports = like