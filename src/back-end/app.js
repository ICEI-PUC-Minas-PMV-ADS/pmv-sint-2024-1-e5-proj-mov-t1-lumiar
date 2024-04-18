require('dotenv').config()
const express = require('express')
const godfatherRoutes = require('./src/routes/godfather')
const institutionRoutes = require('./src/routes/institution')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Godfather = require('./src/models/godfather')
const Institution = require('./src/models/institution')
const jwt = require('jsonwebtoken')
/*const institutionSchema = require('src/validations/index')*/


const app = express()
app.use(express.json())

function onAuthenticate(req, res, next) {
    const apiKey = req.headers['x-api-key']
    if (!apiKey || apiKey !== process.env.X_API_KEY) {
        return res.status(401).json({ erro: 'Chave de API inválida ou ausente' })
    }
    next()
}

//Private Route godfather

app.get('/godfather/:id', checkToken, async (req, res) => {
    
    const id = req.params.id

    const godfather = await Godfather.findById(id, '-password')

    if (!godfather) {
        return res.status(404).json({msg: 'Usuário não encontrado'})
    }
    res.status(200).json({ godfather })
})
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg :'Acesso Negado'})
    }
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({msg:'Token Inválido'})

    }
}
// Private Route institution

app.get('/institution/:id', checkToken, async (req, res) => {

    const id = req.params.id

    const institution = await Institution.findById(id, '-password')

    if (!institution) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }
    res.status(200).json({ institution })
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso Negado' })
    }
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({ msg: 'Token Inválido' })
        
    }
}

app.use(onAuthenticate)
app.use(express.json())

app.use(godfatherRoutes)
app.use(institutionRoutes)

app.listen(8000, () => {
    console.log('Servidor está rodando na porta 8000')
})


//LOGIN GODFATHER

app.post("/auth/godfather/login", async (req, res) => {
    const {email, password} = req.body

    if (!email) {
        return res.status(422).json({ msg: 'Email é obrigatório!' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'Senha é obrigatória!' })
    }
    const godfather = await Godfather.findOne({ email: email })
    if (!godfather) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' })
    }
    const checkPassword = await bcrypt.compare(password, godfather.password)

    if (!checkPassword) {
        return res.status(422).json({msg: 'Senha inválida'})
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
            id: godfather._id,
            },
            secret,
        )

        res.status(200).json({msg: 'Autenticação realizada com sucesso', token})

    } catch(err) {
        console.log(error)
        res
            .status(500)
            .json({ msg: 'Houve um erro no servidor, tente novamente' })
    }

})


// LOGIN INSTITUTION

app.post("/auth/institution/login", async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(422).json({ msg: 'Email é obrigatório!' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'Senha é obrigatória!' })
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
        console.log(error)
        res
            .status(500)
            .json({ msg: 'Houve um erro no servidor, tente novamente' })
    }

})

    
module.exports = app
