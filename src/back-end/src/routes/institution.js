const { Router } = require('express')
const Institution = require('../handlers/institution-handler')

const routes = Router()

routes.get('/institution', Institution.getAllDocument)
routes.get('/institution/:id', Institution.getDocumentById)
routes.get('/institution/name/:name', Institution.getByName)
routes.get('/institution/donations/:id', Institution.getAllDonationInInstitution)
routes.post('/institution', Institution.createDocument)
routes.post('/institution/send-email', Institution.sendEmail)
routes.post('/auth/institution/login', Institution.authLogin)
routes.put('/institution/:id', Institution.updateDocument)
routes.put('/institution/image/:id', Institution.updateImage)
routes.delete('/institution/:id', Institution.delDocumentById)

module.exports = routes
