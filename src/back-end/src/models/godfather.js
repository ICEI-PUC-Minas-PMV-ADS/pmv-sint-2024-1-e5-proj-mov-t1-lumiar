const GodFatherSchema = require("../schemas/godfather-schema");
const MongoDB = require("../database/mongodb");

const connection = MongoDB.createConnection();
const GodFather = connection.model("godfather", GodFatherSchema, "godfathers");

module.exports = GodFather;
