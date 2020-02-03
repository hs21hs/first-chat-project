const Message = require('../models/message')

const runSockets = (io) => {

const confirm = (socket) => {
    socket.emit('countUpdated')
}

io.on('connection', (socket) => {
    console.log("connectioned")
    recievedMessage(socket)
    newMatch(socket)
})

const createMessage = (messageInfo, socket) => {
    const message = new Message({
        text: messageInfo.message,
        sender: messageInfo.sender,
        reciever: messageInfo.reciever
    })

    message.save().then((m) => {
        
        socket.emit('bc', m)
    }).catch((e) => {
        
    })
}

const recievedMessage = (socket) => {
    socket.on("newMessage", (messageInfo) => {
        
        createMessage(messageInfo, socket)
    })
}
}

const newMatch = (socket) => {
    socket.on(("newMatch"), (match) => {
        socket.broadcast.emit('newMatch', match)
        
    })
}


module.exports = runSockets