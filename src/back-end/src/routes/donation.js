const { Router } = require("express");
const Donation = require("../handlers/institution-handler");

const routes = Router();

routes.post("/institution", Donation.createDocument);

module.exports = routes;
