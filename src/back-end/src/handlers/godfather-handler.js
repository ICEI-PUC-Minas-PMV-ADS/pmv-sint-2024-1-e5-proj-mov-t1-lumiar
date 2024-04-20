const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const GodfatherModel = require('../models/godfather')
const { validationDate } = require('../validation')

class Godfather {
    static validateAndFormatGodfather(payload) {
        const { data, errorMessages } = validationDate('godfather', payload)
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

        const godfather = await Godfather.findOne({ email: email })
        if (!godfather) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' })
        }
        const checkPassword = await bcrypt.compare(password, godfather.password)

        if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha inválida' })
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign(
                {
                    id: godfather._id,
                },
                secret,
            )

            res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })

        } catch (err) {
            res
                .status(500)
                .json({ msg: 'Houve um erro no servidor, tente novamente' })
        }
    }

    static async createDocument(req, res) {
        try {
            const body = req.body
            const { cpf } = body
            Godfather.validateAndFormatGodfather(body)

            const godfather = await GodfatherModel.findOne({ cpf }).lean()
            if (godfather) {
                return res.status(404).json({ message: 'Já existe um cpf cadastrado para esse padrinho' })
            }

            const createdGodfather = await GodfatherModel.create(body)
            return res.status(200).json(createdGodfather)
        } catch (error) {
            console.error('Error', error)
            return res.status(error.status || 500).json({ message: error.message || 'falha ao criar documento' })
        }
    }

    static async updateDocument(req, res) {
        const body = req.body
        const { id: idGodfather } = req.params

        try {
            Godfather.validateAndFormatGodfather(body)
            const updatedGodfather = await GodfatherModel.updateById(idGodfather, body)
            return res.status(200).json(updatedGodfather)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao atualizar o documento' })
        }
    }

    static async getAllDocument(_, res) {
        try {
            const godfathers = await GodfatherModel.find().lean()
            return res.status(200).json(godfathers)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async getDocumentById(req, res) {
        const { id: idGodfather } = req.params
        if (!mongoose.Types.ObjectId.isValid(idGodfather)) {
            return res.status(404).json({ message: `${idGodfather} não é um id válido` })
        }

        try {
            const godfather = await GodfatherModel.findById(idGodfather, '-password')

            if (!godfather) {
                return res.status(404).json({ message: `padrinho com id ${idGodfather} não encontrado` })
            }

            return res.status(200).json(godfather)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async getByName(req, res) {
        const { name: godfatherName } = req.params

        try {
            const godfather = await GodfatherModel.findByName(godfatherName)
            if (!godfather) {
                return res.status(404).json({ message: `Padrinho com nome ${godfatherName} não encontrado` })
            }
            return res.status(200).json(godfather)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }

    static async delDocumentById(req, res) {
        const { id: idGodfather } = req.params

        try {
            const godfather = await GodfatherModel.findOneAndDelete({
                _id: idGodfather,
            })

            if (!godfather) {
                return res.status(404).json({ error: `Padrinho com id ${idGodfather} não encontrado` })
            }

            return res.status(200).json(godfather)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }
}

module.exports = Godfather
