const { Schema } = require('mongoose')

module.exports = new Schema({
    value: { type: Number, default: null },
    child: Schema.Types.ObjectId,
    sponsor: Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
})
