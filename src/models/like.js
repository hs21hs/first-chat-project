const mongoose = require('mongoose')
const Match = require('./match')


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
    
    if (like.sender.toString() === like.reciever.toString()) {
        throw new Error("cannot send a like to ones self")
    } else { 
        const complementaryLike = await Like.findOne({sender: like.reciever, reciever: like.sender})
        if(complementaryLike){
            const m = await new Match({userOne: complementaryLike.sender, userTwo: this.sender}).save()
            console.log('match!', m)
            
            //io.emit('nmatch', m)
        
        }
        next()
    }

})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like