const ChildSchema = require('../schemas/child-schema')
const MongoDB = require('../database/mongodb')

const connection = MongoDB.createConnection()
const Child = connection.model('child', ChildSchema, 'child')

module.exports = Child
