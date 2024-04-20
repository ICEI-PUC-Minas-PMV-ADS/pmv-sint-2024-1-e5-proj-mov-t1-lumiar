const { Router } = require('express')
const Godfather = require('../handlers/godfather-handler')

const routes = Router()

routes.get('/godfather/:id', Godfather.getDocumentById)
routes.get('/godfather/name/:name', Godfather.getByName)
routes.get('/godfather', Godfather.getAllDocument)
routes.post('/godfather', Godfather.createDocument)
routes.post('/auth/godfather/login', Godfather.authLogin)
routes.put('/godfather/:id', Godfather.updateDocument)
routes.delete('/godfather/:id', Godfather.delDocumentById)

module.exports = routes
