const { Router } = require("express");
const Institution = require("../handlers/institution-handler");

const routes = Router();

routes.post("/institution", Institution.createDocument);
routes.get("/institution", Institution.getAllDocument);
routes.get("/institution/:id", Institution.getDocumentById);
routes.get("/institution/name/:name", Institution.getDocumentById);
routes.put("/institution/:id", Institution.updateDocument);
routes.delete("/institution/:id", Institution.delDocumentById);

module.exports = routes;
