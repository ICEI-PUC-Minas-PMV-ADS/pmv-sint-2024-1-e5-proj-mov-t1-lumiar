const { Schema } = require('mongoose')

module.exports = new Schema({
    value: { type: Number, default: null },
    children: Schema.Types.ObjectId,
    godfather: Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
})
