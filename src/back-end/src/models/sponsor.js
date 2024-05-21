const SponsorSchema = require('../schemas/sponsor-schema')
const MongoDB = require('../database/mongodb')

const connection = MongoDB.createConnection()
const Sponsor = connection.model('sponsor', SponsorSchema, 'sponsors')

Sponsor.updateById = async (idSponsor, bodyToUpdate) => {
    return Sponsor.findOneAndUpdate({ _id: idSponsor }, bodyToUpdate, { new: true }).lean()
}

Sponsor.findByName = async (name) => {
    return Sponsor.findOne({ name }, '-password').lean()
}

Sponsor.updateImage = async (idChild, imageUrl) => {
    return Sponsor.findOneAndUpdate({ _id: idChild }, { image: imageUrl }, { new: true }).lean()
}

module.exports = Sponsor
