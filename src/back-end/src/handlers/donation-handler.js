const DonationModel = require('../models/donation')
const { validationDate } = require('../validation')
const DonationService = require('../services/donation-service')

class Donation {
    static validateAndFormatDonation(payload) {
        const { data, errorMessages } = validationDate('donation', payload)
        if (errorMessages) {
            throw {
                status: 400,
                message: errorMessages.map((value) => {
                    return value.message
                }),
            }
        }

        return data
    }

    static async createDocument(req, res) {
        const body = req.body
        const { child, godfather } = body

        try {
            Donation.validateAndFormatDonation(body)

            if ((await DonationService.existChild(child)) && (await DonationService.existGodfather(godfather))) {
                const createdDonation = await DonationModel.create(body)
                return res.status(200).json({ data: createdDonation })
            }

            return res.status(400).json({
                message: 'Não existe criança ou padrinho para processar a doação',
            })
        } catch (error) {
            console.error('Error', error)
            return res.status(error.status || 500).json({ message: error.message || 'falha ao criar documento' })
        }
    }
}

module.exports = Donation
