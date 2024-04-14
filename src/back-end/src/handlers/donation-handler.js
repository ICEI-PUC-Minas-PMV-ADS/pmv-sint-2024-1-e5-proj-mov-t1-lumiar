const DonationModel = require('../models/donation')
const Validation = require('../validation')
const DonationService = require('../services/donation-service')

class Donation {
    static async createDocument(req, res) {
        const body = req.body
        const { child, godfather } = body
        Validation.validationDate('donation', body)

        if ((await DonationService.existChild(child)) && (await DonationService.existGodfather(godfather))) {
            const createdDonation = await DonationModel.create({ body })
            return res.status(200).json(createdDonation)
        }

        return res.status(400).json({
            message: 'Não existe criança ou padrinho para processar a doação',
        })
    }
}

module.exports = Donation
