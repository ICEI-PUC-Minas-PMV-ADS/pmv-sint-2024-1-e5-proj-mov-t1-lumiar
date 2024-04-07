const GodfatherSchema = require("../schemas/godfather-schema");
const MongoDB = require("../database/mongodb");

const connection = MongoDB.createConnection();
const Godfather = connection.model("godfather", GodfatherSchema, "godfathers");

Godfather.updateById = async (idGodfather, bodyToUpdate) => {
  return Godfather.findOneAndUpdate({ _id: idGodfather }, bodyToUpdate).lean();
};

Godfather.findByName = async (name) => {
  return Godfather.findOne({ name }).lean();
};

module.exports = Godfather;
