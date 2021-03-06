const express = require('express')
const cors = require('cors')

require('./db/mongoose')

const userRouter = require('./routers/user')
const messageRouter = require('./routers/message')
const likeRouter = require('./routers/like')
const dislikeRouter = require('./routers/dislike')
const matchRouter = require('./routers/match')

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(messageRouter)
app.use(likeRouter)
app.use(dislikeRouter)
app.use(matchRouter)

module.exports = app