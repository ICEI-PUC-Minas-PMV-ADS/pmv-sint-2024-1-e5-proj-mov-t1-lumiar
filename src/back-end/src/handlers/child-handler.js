const mongoose = require('mongoose')

const ChildModel = require('../models/child')
const DonationModel = require('../models/donation')
const { validationData } = require('../validation')

class Child {
    static validateAndFormatChild(payload) {
        const formattedPayload = { ...payload, dateBirth: new Date(payload.dateBirth) }
        const { data, errorMessages } = validationData('child', formattedPayload)
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
        try {
            const body = req.body

            Child.validateAndFormatChild(body)

            const isValidChild = await ChildModel.findOne({ cpf: body.cpf }).lean()
            if (isValidChild) {
                return res.status(404).json({ message: 'Já existe um cpf cadastrado para essa criança' })
            }

            const child = await ChildModel.create(body)
            return res.status(200).json(child.toObject())
        } catch (error) {
            console.error('Error', error)
            return res.status(error.status || 500).json({ message: error.message || 'falha ao criar documento' })
        }
    }

    static async updateDocument(req, res) {
        const body = req.body
        const { id: idChild } = req.params

        try {
            Child.validateAndFormatChild(body)

            const updatedChild = await ChildModel.updateById(idChild, body)
            return res.status(200).json(updatedChild)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao atualizar o documento' })
        }
    }

    static async updateImage(req, res) {
        const { id: childId } = req.params
        const { imageUrl } = req.body

        if (!mongoose.Types.ObjectId.isValid(childId)) {
            return res.status(404).json({ message: `${childId} não é um id válido` })
        }

        try {
            const children = await ChildModel.updateImage(childId, imageUrl)
            return res.status(200).json(children)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao atualizar documento' })
        }
    }

    static async getAllDocumentByInstitution(req, res) {
        const { id: institutionId } = req.params

        if (!mongoose.Types.ObjectId.isValid(institutionId)) {
            return res.status(404).json({ message: `${institutionId} não é um id válido` })
        }

        try {
            const children = await ChildModel.find({ institution: institutionId }).lean()
            return res.status(200).json(children)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async getDocumentById(req, res) {
        const { id: idChild } = req.params
        if (!mongoose.Types.ObjectId.isValid(idChild)) {
            return res.status(404).json({ message: `${idChild} não é um id válido` })
        }

        try {
            const child = await ChildModel.findById(idChild)
            if (!child) {
                return res.status(404).json({
                    message: `criança com id ${idChild} não encontrada`,
                })
            }
            return res.status(200).json(child)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async getByName(req, res) {
        const { name: childName } = req.params

        try {
            const child = await ChildModel.findByName(childName)
            if (!child) {
                return res.status(404).json({
                    message: `Criança com nome ${childName} não encontrada`,
                })
            }
            return res.status(200).json(child)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async getAllDonation(req, res) {
        const { id: idChild } = req.params
        if (!mongoose.Types.ObjectId.isValid(idChild)) {
            return res.status(404).json({ message: `${idChild} não é um id válido` })
        }

        try {
            const donations = await DonationModel.find({ child: idChild }).lean()

            const sumOfDonations = donations.reduce((acc, donation) => {
                const donationValue = donation.value || 0;
                return acc + donationValue;
            }, 0)

            return res.status(200).json(sumOfDonations)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async delDocumentById(req, res) {
        const { id: idChild } = req.params

        try {
            const child = await ChildModel.findOneAndDelete({
                _id: idChild,
            })

            if (!child) {
                return res.status(404).json({
                    error: `Criança com id ${idChild} não encontrada`,
                })
            }
            return res.status(200).json(child)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }
}

module.exports = Child
