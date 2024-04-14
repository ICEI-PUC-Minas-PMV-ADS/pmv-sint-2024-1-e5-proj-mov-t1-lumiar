require('dotenv').config()
const mongoose = require('mongoose')

class MongoDb {
    static createConnection() {
        return mongoose.createConnection(process.env.MONGO_STRING_CONNECTION)
    }
}

module.exports = MongoDb
