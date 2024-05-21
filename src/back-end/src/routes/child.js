const { Router } = require('express')
const Child = require('../handlers/child-handler')

const routes = Router()

routes.get('/child/institution/:id', Child.getAllDocumentByInstitution)
routes.get('/child/:id', Child.getDocumentById)
routes.get('/child/name/:name', Child.getByName)
routes.post('/child', Child.createDocument)
routes.put('/child/:id', Child.updateDocument)
routes.put('/child/image/:id', Child.updateImage)
routes.delete('/child/:id', Child.delDocumentById)

module.exports = routes
