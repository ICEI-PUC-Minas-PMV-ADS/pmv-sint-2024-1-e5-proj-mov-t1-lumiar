const ChildSchema = require('../schemas/child-schema')
const MongoDB = require('../database/mongodb')

const connection = MongoDB.createConnection()
const Child = connection.model('child', ChildSchema, 'children')

Child.findByName = async (name) => {
    return Child.findOne({ name }, '-password').lean()
}

Child.updateById = async (idChild, bodyToUpdate) => {
    return Child.findOneAndUpdate({ _id: idChild }, bodyToUpdate, { new: true }).lean()
}

Child.updateImage = async (idChild, imageUrl) => {
    return Child.findOneAndUpdate({ _id: idChild }, { image: imageUrl }, { new: true }).lean()
}

module.exports = Child
