const express = require('express')

const SponsorRoutes = require('../routes/sponsor')
const InstitutionRoutes = require('../routes/institution')
const DonationRoutes = require('../routes/donation')
const ChildRoutes = require('../routes/child')

const app = express()

function onAuthenticate(req, res, next) {
    const apiKey = req.headers['x-api-key']
    if (!apiKey || apiKey !== process.env.X_API_KEY) {
        return res.status(401).json({ erro: 'Chave de API inválida ou ausente' })
    }
    next()
}

app.use(express.json())
app.use(onAuthenticate)

app.use(SponsorRoutes)
app.use(InstitutionRoutes)
app.use(DonationRoutes)
app.use(ChildRoutes)

module.exports = app
