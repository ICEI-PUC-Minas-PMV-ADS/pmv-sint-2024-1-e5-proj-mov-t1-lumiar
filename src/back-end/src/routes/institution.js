const { Router } = require('express')
const Institution = require('../handlers/institution-handler')

const routes = Router()

routes.post('/institution', Institution.createDocument)
routes.post('/send-email', Institution.sendEmail)
routes.post('/auth/institution/login', Institution.authLogin)
routes.get('/institution', Institution.getAllDocument)
routes.get('/institution/:id', Institution.getDocumentById)
routes.get('/institution/name/:name', Institution.getByName)
routes.put('/institution/:id', Institution.updateDocument)
routes.delete('/institution/:id', Institution.delDocumentById)

module.exports = routes
