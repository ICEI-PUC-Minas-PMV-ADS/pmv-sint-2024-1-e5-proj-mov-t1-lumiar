const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

const InstitutionModel = require('../models/institution')
const { validationDate } = require('../validation')

class Institution {
    static validateAndFormatInstitution(payload) {
        const formattedPayload = { ...payload, creationDate: new Date(payload.creationDate) }
        const { data, errorMessages } = validationDate('institution', formattedPayload)
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

        const institution = await Institution.findOne({ email: email })
        if (!institution) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' })
        }

        const checkPassword = await bcrypt.compare(password, institution.password)
        if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha inválida' })
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign(
                {
                    id: institution._id,
                },
                secret,
            )

            res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })
        } catch (err) {
            res.status(500).json({ msg: 'Houve um erro no servidor, tente novamente' })
        }
    }

    static async createDocument(req, res) {
        try {
            const body = req.body
            const { cnpj, password } = body

            Institution.validateAndFormatInstitution(body)

            const institution = await InstitutionModel.findOne({ cnpj }).lean()
            if (institution) {
                return res.status(404).json({
                    message: 'Já existe um cnpj cadastrado para essa instituição',
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const institutionData = { ...body, password: hashedPassword }
            const institutionCreated = await InstitutionModel.create(institutionData)

            return res.status(200).json(institutionCreated)
        } catch (error) {
            console.error('Error', error)
            return res.status(error.status || 500).json({ message: error.message || 'falha ao criar documento' })
        }
    }

    static async updateDocument(req, res) {
        const body = req.body
        const { id: idInstitution } = req.params

        try {
            Institution.validateAndFormatInstitution(body)

            const updatedInstitution = await InstitutionModel.updateById(idInstitution, body)
            return res.status(200).json(updatedInstitution)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao atualizar o documento' })
        }
    }

    static async getAllDocument(_, res) {
        try {
            const institutions = await InstitutionModel.find().lean()

            const institutionsWithoutPassword = institutions.map((institution) => {
                const { password, ...institutionWithoutPassword } = institution
                return institutionWithoutPassword
            })
            return res.status(200).json(institutionsWithoutPassword)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async getDocumentById(req, res) {
        const { id: idInstitution } = req.params
        if (!mongoose.Types.ObjectId.isValid(idInstitution)) {
            return res.status(404).json({ message: `${idInstitution} não é um id válido` })
        }

        try {
            const institution = await InstitutionModel.findById(idInstitution, '-password')
            if (!institution) {
                return res.status(404).json({
                    message: `instituição com id ${idInstitution} não encontrado`,
                })
            }
            return res.status(200).json(institution)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async sendEmail(req, res) {
        try {
            const { to, subject, text } = req.body

            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.LUMIAR_EMAIL_USER,
                    pass: process.env.LUMINAR_EMAIL_PASS,
                },
            })

            let mailOptions = {
                from: process.env.LUMIAR_EMAIL_USER,
                to: to,
                subject: subject,
                text: text,
            }

            const info = await transporter.sendMail(mailOptions)
            console.log('Email enviado: ' + info.response)

            res.status(200).json({ message: 'E-mail enviado com sucesso!' })
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error)
            res.status(500).json({ error: 'Erro ao enviar e-mail' })
        }
    }

    static async getByName(req, res) {
        const { name: institutionName } = req.params

        try {
            const institution = await InstitutionModel.findByName(institutionName)
            if (!institution) {
                return res.status(404).json({
                    message: `Instituição com nome ${institutionName} não encontrado`,
                })
            }
            return res.status(200).json(institution)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async delDocumentById(req, res) {
        const { id: idInstitution } = req.params

        try {
            const institution = await InstitutionModel.findOneAndDelete({
                _id: idInstitution,
            })

            if (!institution) {
                return res.status(404).json({
                    error: `Institution com id ${idInstitution} não encontrado`,
                })
            }
            return res.status(200).json(institution)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }
}

module.exports = Institution
