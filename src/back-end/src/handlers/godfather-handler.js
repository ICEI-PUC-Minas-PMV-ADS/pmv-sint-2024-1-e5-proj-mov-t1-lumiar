const GodfatherModel = require('../models/godfather')
const { validationDate } = require('../validation')

class Godfather {
    static validateAndFormatGodfather(payload) {
        const { data, errorMessages } = validationDate('godfather', payload)
        if (errorMessages) {
            throw {
                statusCode: 400,
                message: errorMessages,
            }
        }

        return data
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
            return res.status(400).json({ error: error.message })
        }
    }

    static async updateDocument(req, res) {
        const body = req.body
        const { id: idGodfather } = req.params
        Godfather.validateAndFormatGodfather(body)

        try {
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

        try {
            const godfather = await GodfatherModel.findById(idGodfather)
            if (!godfather) {
                res.status(404).json({ error: `padrinho com id ${idGodfather} não encontrado` })
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
                res.status(404).json({ error: `Padrinho com nome ${godfatherName} não encontrado` })
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
                res.status(404).json({ error: `Padrinho com id ${idGodfather} não encontrado` })
            }

            return res.status(200).json(godfather)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'falha ao buscar documentos' })
        }
    }
}

module.exports = Godfather
