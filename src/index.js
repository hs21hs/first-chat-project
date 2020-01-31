const http = require('http')
const app = require('./app')

const socketio = require('socket.io')
const Message = require('./models/message')

const server = http.createServer(app)
const io = socketio(server)
const runSockets = require('./sockets/starting')
const port = process.env.PORT || 3000

runSockets(io)


server.listen(port, () => {
    console.log('server is up on port'+port)
})

module.exports = io