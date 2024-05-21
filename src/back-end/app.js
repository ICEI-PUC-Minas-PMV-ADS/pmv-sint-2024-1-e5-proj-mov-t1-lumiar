require('dotenv').config()

const express = require('express')
const cors = require('cors')

const SponsorRoutes = require('./src/routes/sponsor')
const InstitutionRoutes = require('./src/routes/institution')
const DonationRoutes = require('./src/routes/donation')
const ChildRoutes = require('./src/routes/child')

const app = express()
app.use(express.json())
app.use(cors())

function onAuthenticate(req, res, next) {
    const apiKey = req.headers['x-api-key']
    if (!apiKey || apiKey !== process.env.X_API_KEY) {
        return res.status(401).json({ erro: 'Chave de API inválida ou ausente' })
    }
    next()
}

app.use(onAuthenticate)

app.use(SponsorRoutes)
app.use(InstitutionRoutes)
app.use(DonationRoutes)
app.use(ChildRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Servidor está rodando na porta ${process.env.PORT}`)
})

module.exports = app
