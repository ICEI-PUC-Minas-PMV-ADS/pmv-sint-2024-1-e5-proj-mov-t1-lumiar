const { Schema } = require("mongoose");

module.exports = new Schema({
  name: { type: String, default: null },
  age: { type: Number, default: null },
  description: { type: String, default: null },
  institution: Schema.Types.ObjectId,
  dream: { type: String, default: null },
  entryData: { type: Date, default: Date.now },
  address: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});
