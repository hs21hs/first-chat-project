const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Message = require('./models/message')
require('./db/mongoose')

const userRouter = require('./routers/user')
const messageRouter = require('./routers/message')

const cors = require('cors')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const sf = require('./sockets/starting')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(messageRouter)

const createMessage = (messageInfo, socket) => {
    const message = new Message({
        text: messageInfo.message,
        sender: messageInfo.sender,
        reciever: messageInfo.reciever
    })

    message.save().then((m) => {
        console.log(m)
        io.emit('bc', m)
    }).catch((e) => {
        console.log(e)
    })
}

const recievedMessage = (socket) => {
    socket.on("newMessage", (messageInfo) => {
        console.log(messageInfo)
        createMessage(messageInfo, socket)
    })
}

io.on('connection', (socket) => {
    console.log("connectioned")
    sf.confirm(socket)
    recievedMessage(socket)
})



server.listen(port, () => {
    console.log('server is up on port'+port)
})

module.exports = io