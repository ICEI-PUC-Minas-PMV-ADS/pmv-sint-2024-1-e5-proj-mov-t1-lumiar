const InstitutionSchema = require("../schemas/institution-schema");
const MongoDB = require("../database/mongodb");

const connection = MongoDB.createConnection();
const InstitutionSchema = connection.model(
  "institution",
  InstitutionSchema,
  "institutions"
);

module.exports = InstitutionSchema;
