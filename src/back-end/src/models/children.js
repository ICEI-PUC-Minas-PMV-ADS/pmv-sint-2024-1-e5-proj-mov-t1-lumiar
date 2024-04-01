const ChildrenSchema = require("../schemas/children-schema");
const MongoDB = require("../database/mongodb");

const connection = MongoDB.createConnection();
const Children = connection.model("children", ChildrenSchema, "childrens");

module.exports = Children;
