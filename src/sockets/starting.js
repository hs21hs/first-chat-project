const Message = require('../models/message')

const confirm = (socket) => {
    socket.emit('countUpdated')
}




module.exports = {confirm}