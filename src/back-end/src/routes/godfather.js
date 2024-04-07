const { Router } = require("express");
const Godfather = require("../handlers/godfather-handler");

const routes = Router();

routes.post("/godfather", Godfather.createDocument);
routes.get("/godfather", Godfather.getAllDocument);
routes.get("/godfather/:id", Godfather.getDocumentById);
routes.get("/godfather/name/:name", Godfather.getDocumentById);
routes.put("/godfather/:id", Godfather.updateDocument);
routes.delete("/godfather/:id", Godfather.delDocumentById);

module.exports = routes;
