const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/'+process.env.DBNAME,{
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true 
})



