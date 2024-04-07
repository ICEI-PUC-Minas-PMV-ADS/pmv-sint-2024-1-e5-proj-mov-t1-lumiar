const InstitutionSchema = require("../schemas/institution-schema");
const MongoDB = require("../database/mongodb");
const Institution = require("../handlers/institution-handler");

const connection = MongoDB.createConnection();
const institution = connection.model(
  "institution",
  InstitutionSchema,
  "institutions"
);

Institution.updateById = async (idInstitution, bodyToUpdate) => {
  return Institution.findOneAndUpdate(
    { _id: idInstitution },
    bodyToUpdate
  ).lean();
};

Institution.findByName = async (name) => {
  return Institution.findOne({ name }).lean();
};

module.exports = institution;
