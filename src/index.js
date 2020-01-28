const http = require('http')
const app = require('./app')

const socketio = require('socket.io')
const Message = require('./models/message')

const server = http.createServer(app)
const io = socketio(server)
const sf = require('./sockets/starting')
const port = process.env.PORT || 3000

io.on('connection', (socket) => {
    console.log("connectioned")
    sf.confirm(socket)
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



server.listen(port, () => {
    console.log('server is up on port'+port)
})

module.exports = io