const mongoose = require('mongoose')

const DonationModel = require('../models/donation')
const { validationData } = require('../validation')
const DonationService = require('../services/donation-service')

class Donation {
    static validateAndFormatDonation(payload) {
        const { data, errorMessages } = validationData('donation', payload)
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

    static async getAllDonationByIdSponsor(req, res) {
        const { id: sponsorId } = req.params

        if (!sponsorId || !mongoose.Types.ObjectId.isValid(sponsorId)) {
            return res.status(404).json({
                message: 'Id invalido ou inexistente, gentileza informar',
            })
        }

        const donations = await DonationModel.find({ sponsor: sponsorId }).lean()
        return res.status(200).json({ data: donations })
    }

    static async getAllDonationByIdChild(req, res) {
        const { id: childId } = req.params

        if (!childId || !mongoose.Types.ObjectId.isValid(childId)) {
            return res.status(404).json({
                message: 'Id invalido ou inexistente, gentileza informar',
            })
        }

        const donations = await DonationModel.find({ child: childId }).lean()
        return res.status(200).json({ data: donations })
    }

    static async createDocument(req, res) {
        const body = req.body
        const { child, sponsor } = body

        try {
            Donation.validateAndFormatDonation(body)

            if ((await DonationService.existChild(child)) && (await DonationService.existSponsor(sponsor))) {
                const createdDonation = await DonationModel.create(body)
                return res.status(200).json({ data: createdDonation.toObject() })
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
