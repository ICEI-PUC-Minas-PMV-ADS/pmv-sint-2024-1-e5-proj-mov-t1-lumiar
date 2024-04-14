const express = require('express')
const godfatherRoutes = require('./src/routes/godfather')
const institutionRoutes = require('./src/routes/institution')

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

app.use(godfatherRoutes)
app.use(institutionRoutes)

app.listen(8000, () => {
    console.log('Servidor está rodando na porta 8000')
})

module.exports = app
