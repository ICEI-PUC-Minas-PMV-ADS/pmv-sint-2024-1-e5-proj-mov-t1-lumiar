const { Schema } = require("mongoose");

module.exports = new Schema({
  name: { type: String, default: null },
  creationData: { type: Date, default: null },
  email: { type: String, default: null },
  CNPJ: { type: String, default: null },
  children: { type: Map, default: {} },
  description: { type: String, default: null },
  roll: { type: String, default: null },
  address: { type: String, default: null },
  affiliation: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});
