const InstitutionSchema = require('../schemas/institution-schema')
const MongoDB = require('../database/mongodb')

const connection = MongoDB.createConnection()
const Institution = connection.model('institution', InstitutionSchema, 'institutions')

Institution.updateById = async (idInstitution, bodyToUpdate) => {
    return Institution.findOneAndUpdate({ _id: idInstitution }, bodyToUpdate, { new: true }).lean()
}

Institution.findByName = async (name) => {
    return Institution.findOne({ name }, '-password').lean()
}

module.exports = Institution
