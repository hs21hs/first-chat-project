const Message = require('../models/message')

const runSockets = (io) => {


io.on('connection', (socket) => {
    console.log("connectioned")
    newMatch(socket)
    newMessage(socket)
})

const newMatch = (socket) => {
    socket.on(("newMatch"), (match) => {
        socket.broadcast.emit('newMatch', match)
        
    })
}

const newMessage = (socket) => {
    socket.on("newMessage", (msg) => {
        socket.broadcast.emit('newMessage', msg)
    })
}
}


module.exports = runSockets