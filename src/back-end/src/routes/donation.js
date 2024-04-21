const { Router } = require('express')
const Donation = require('../handlers/donation-handler')

const routes = Router()

routes.post('/create-donation', Donation.createDocument)
routes.get('/get-donation/sponsor/:id', Donation.getAllDonationByIdSponsor)
routes.get('/get-donation/child/:id', Donation.getAllDonationByIdChild)

module.exports = routes
