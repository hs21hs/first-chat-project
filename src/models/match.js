const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
        userOne: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        userTwo: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        userOneOpened: {
            type: Boolean,
            default: false,
            required: true
        },
        userTwoOpened: {
            type: Boolean,
            default: false,
            required: true   
        }
        

})

matchSchema.pre('save', async function (next) {
    const match = this
    
    if (match.userOne._id.toString() === match.userTwo._id.toString()) {
        throw new Error("cannot send a match to ones self")}
    else{next()}

    
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match