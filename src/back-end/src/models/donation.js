const DonationSchema = require('../schemas/donation-schema')
const MongoDB = require('../database/mongodb')

const connection = MongoDB.createConnection()
const Donation = connection.model('donation', DonationSchema, 'donations')

module.exports = Donation
