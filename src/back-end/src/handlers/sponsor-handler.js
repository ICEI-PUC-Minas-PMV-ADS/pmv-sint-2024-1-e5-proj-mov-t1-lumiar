const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SponsorModel = require('../models/sponsor')
const { validationDate } = require('../validation')

class Sponsor {
    static validateAndFormatSponsor(payload) {
        const { data, errorMessages } = validationDate('sponsor', payload)
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

    static async authLogin(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(422).json({ msg: `${email} e ${password} são obrigatórios` })
        }

        const sponsor = await SponsorModel.findOne({ email })
        if (!sponsor) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' })
        }

        const checkPassword = await bcrypt.compare(password, sponsor.password)
        if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha inválida' })
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign(
                {
                    id: sponsor._id,
                },
                secret,
            )

            res.status(200).json({ msg: 'Autenticação realizada com sucesso', token, userId: sponsor._id })
        } catch (err) {
            res.status(500).json({ msg: 'Houve um erro no servidor, tente novamente' })
        }
    }

    static async createDocument(req, res) {
        try {
            const body = req.body
            const { cpf, password } = body
            Sponsor.validateAndFormatSponsor(body)

            const sponsor = await SponsorModel.findOne({ cpf }).lean()
            if (sponsor) {
                return res.status(404).json({ message: 'Já existe um cpf cadastrado para esse padrinho' })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const sponsorData = { ...body, password: hashedPassword }
            const createdSponsor = await SponsorModel.create(sponsorData)

            return res.status(200).json(createdSponsor.toObject())
        } catch (error) {
            console.error('Error', error)
            return res.status(error.status || 500).json({ message: error.message || 'falha ao criar documento' })
        }
    }

    static async updateDocument(req, res) {
        const body = req.body
        const { id: idSponsor } = req.params

        try {
            Sponsor.validateAndFormatSponsor(body)
            const updatedSponsor = await SponsorModel.updateById(idSponsor, body)
            return res.status(200).json(updatedSponsor)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao atualizar o documento' })
        }
    }

    static async updateImage(req, res) {
        const { id: sponsorId } = req.params
        const { imageUrl } = req.body

        if (!mongoose.Types.ObjectId.isValid(sponsorId)) {
            return res.status(404).json({ message: `${sponsorId} não é um id válido` })
        }

        try {
            const sponsor = await SponsorModel.updateImage(sponsorId, imageUrl)
            return res.status(200).json(sponsor)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao atualizar documento' })
        }
    }

    static async getAllDocument(_, res) {
        try {
            const sponsors = await SponsorModel.find().lean()
            return res.status(200).json(sponsors)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async getDocumentById(req, res) {
        const { id: idSponsor } = req.params
        if (!mongoose.Types.ObjectId.isValid(idSponsor)) {
            return res.status(404).json({ message: `${idSponsor} não é um id válido` })
        }

        try {
            const sponsor = await SponsorModel.findById(idSponsor, '-password')

            if (!sponsor) {
                return res.status(404).json({ message: `padrinho com id ${idSponsor} não encontrado` })
            }

            return res.status(200).json(sponsor)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async getByName(req, res) {
        const { name: sponsorName } = req.params

        try {
            const sponsor = await SponsorModel.findByName(sponsorName)
            if (!sponsor) {
                return res.status(404).json({ message: `Padrinho com nome ${sponsorName} não encontrado` })
            }
            return res.status(200).json(sponsor)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async delDocumentById(req, res) {
        const { id: idSponsor } = req.params

        try {
            const sponsor = await SponsorModel.findOneAndDelete({
                _id: idSponsor,
            })

            if (!sponsor) {
                return res.status(404).json({ error: `Padrinho com id ${idSponsor} não encontrado` })
            }

            return res.status(200).json(sponsor)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }
}

module.exports = Sponsor
