const ChildrenSchema = require("../schemas/children-schema");
const MongoDB = require("../database/mongodb");

const connection = MongoDB.createConnection();
const Child = connection.model("child", ChildrenSchema, "children");

module.exports = Child;
