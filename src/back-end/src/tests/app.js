const express = require('express')
const GodfatherRoutes = require('../routes/godfather')
const InstitutionRoutes = require('../routes/institution')
const DonationRoutes = require('../routes/donation')

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

app.use(GodfatherRoutes)
app.use(InstitutionRoutes)
app.use(DonationRoutes)

module.exports = app
