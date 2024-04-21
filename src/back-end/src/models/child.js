const ChildrenSchema = require('../schemas/child-schema')
const MongoDB = require('../database/mongodb')

const connection = MongoDB.createConnection()
const Child = connection.model('child', ChildrenSchema, 'children')

Child.updateById = async (idChild, bodyToUpdate) => {
    return Child.findOneAndUpdate({ _id: idChild }, bodyToUpdate, { new: true }).lean()
}

Child.findByName = async (name) => {
    return Child.findOne({ name }, '-password').lean()
}

module.exports = Child
