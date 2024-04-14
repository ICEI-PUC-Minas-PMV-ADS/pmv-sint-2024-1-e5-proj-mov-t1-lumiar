const { MongoMemoryServer } = require('mongodb-memory-server')

module.exports = async function globalSetup() {
    const instance = await MongoMemoryServer.create({ instance: { port: 27017 } })
    global.__MONGOINSTANCE = instance
}
