const { Schema } = require("mongoose");

module.exports = new Schema({
  name: { type: String, default: null },
  age: { type: Number, default: null },
  email: { type: String, default: null },
  cpf: { type: String, default: null },
  donations: { type: Map, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});
