const Message = require('../models/message')

const runSockets = (io) => {

const confirm = (socket) => {
    socket.emit('countUpdated')
}

io.on('connection', (socket) => {
    console.log("connectioned")
    recievedMessage(socket)
})

const createMessage = (messageInfo, socket) => {
    const message = new Message({
        text: messageInfo.message,
        sender: messageInfo.sender,
        reciever: messageInfo.reciever
    })

    message.save().then((m) => {
        
        io.emit('bc', m)
    }).catch((e) => {
        
    })
}

const recievedMessage = (socket) => {
    socket.on("newMessage", (messageInfo) => {
        
        createMessage(messageInfo, socket)
    })
}
}

module.exports = runSockets