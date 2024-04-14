require('dotenv').config({ path: '.env.test' })

const Institution = require('../../models/institution')

const { institutionMock } = require('../mocks/institution-mock')

const request = require('supertest')
const app = require('../app')

describe('Institution handler test', () => {
    beforeEach(async () => {
        await Institution.deleteMany({})
    })

    describe('SUCCESS CASE', () => {
        it('Should be able to create a institution', async () => {
            const { body, statusCode } = await request(app)
                .post(`/institution`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(institutionMock)

            expect(statusCode).toBe(200)

            const institution = await Institution.findOne({ name: institutionMock.name }).lean()
            expect(body.age).toBe(institution.age)
            expect(body.name).toBe(institution.name)
            expect(body.email).toBe(institution.email)
            expect(body.cnpj).toBe(institution.cnpj)
            expect(body.children).toMatchObject(institution.children)
            expect(body.description).toBe(institution.description)
            expect(body.address).toMatchObject(institution.address)
            expect(body.affiliation).toBe(institution.affiliation)
        })

        it('Should be able to update a institution', async () => {
            const institution = await Institution.create(institutionMock)

            const newInstitution = { ...institutionMock, name: 'New Name' }

            const { body, statusCode } = await request(app)
                .put(`/institution/${institution._id}`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(newInstitution)

            expect(statusCode).toBe(200)

            const institutionUpdated = await Institution.findOne({ _id: institution._id }).lean()
            expect(body.name).toBe(institutionUpdated.name)
        })
    })
})
