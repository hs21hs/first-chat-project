const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/chat-project',{
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true 
})



