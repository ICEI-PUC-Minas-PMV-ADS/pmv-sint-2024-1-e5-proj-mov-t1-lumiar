const { Router } = require('express')
const Sponsor = require('../handlers/sponsor-handler')

const routes = Router()

routes.get('/sponsor/:id', Sponsor.getDocumentById)
routes.get('/sponsor/name/:name', Sponsor.getByName)
routes.get('/sponsor', Sponsor.getAllDocument)
routes.post('/sponsor', Sponsor.createDocument)
routes.post('/auth/sponsor/login', Sponsor.authLogin)
routes.put('/sponsor/:id', Sponsor.updateDocument)
routes.delete('/sponsor/:id', Sponsor.delDocumentById)

module.exports = routes
