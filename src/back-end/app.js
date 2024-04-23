require('express-async-errors')
require('dotenv').config()

const express = require('express')

const SponsorRoutes = require('./src/routes/sponsor')
const InstitutionRoutes = require('./src/routes/institution')
const DonationRoutes = require('./src/routes/donation')
const ChildRoutes = require('./src/routes/child')

const app = express()

function onAuthenticate(req, res, next) {
    const apiKey = req.headers['x-api-key']
    if (!apiKey || apiKey !== process.env.X_API_KEY) {
        return res.status(401).json({ message: 'Chave de API inválida ou ausente' })
    }
    next()
}

function errorHandler(err, _, res, next) {
    const status = err.status || 500
    const message = err.message || 'Erro interno do servidor'

    res.status(status).json({ error: status, message: message })
}

app.use(express.json())
app.use(onAuthenticate)
app.use(errorHandler)

app.use(SponsorRoutes)
app.use(InstitutionRoutes)
app.use(DonationRoutes)
app.use(ChildRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Servidor está rodando na porta ${process.env.PORT}`)
})

module.exports = app
