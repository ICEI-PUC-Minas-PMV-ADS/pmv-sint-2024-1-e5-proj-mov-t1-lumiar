const { Router } = require('express')
const Donation = require('../handlers/donation-handler')

const routes = Router()

routes.post('/create-donation', Donation.createDocument)

module.exports = routes
