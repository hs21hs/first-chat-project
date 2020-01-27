const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'chat-project'

MongoClient.connect(connectionURL, { useUnifiedTopology: true}, (error, client) => {
    if (error){
        return console.log("unable to connnect")
    }
    console.log('connected')

    const db= client.db(databaseName)

    db.collection('users').insertOne({
        name:'haider',
        age: 24
    })
})