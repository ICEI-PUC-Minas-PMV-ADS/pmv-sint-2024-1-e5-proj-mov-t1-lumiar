const { Schema } = require('mongoose')

module.exports = new Schema({
    name: { type: String, default: null },
    password: { type: String, default: null },
    creationDate: { type: Date, default: null },
    email: { type: String, default: null },
    cnpj: { type: String, default: null },
    child: { type: Map, default: {} },
    description: { type: String, default: null },
    address: { type: Object, default: null },
    affiliation: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    image: { type: String, default: null }
})
