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

        it('Should be able to get all institution registered', async () => {
            await Institution.create(institutionMock)
            await Institution.create({ ...institutionMock, cnpj: '091.952.320-01' })
            await Institution.create({ ...institutionMock, cnpj: '561.799.850-14' })

            const { body, statusCode } = await request(app).get(`/institution`).set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body).toHaveLength(3)
            expect(body.every((doc) => doc.email === 'test@example.com')).toBe(true)
        })

        it('Should be able to get one institution by id', async () => {
            const institution = await Institution.create(institutionMock)

            const { body, statusCode } = await request(app)
                .get(`/institution/${institution._id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body.age).toBe(institution._doc.age)
            expect(body.name).toBe(institution._doc.name)
            expect(body.email).toBe(institution._doc.email)
            expect(body.cpf).toBe(institution._doc.cpf)
        })

        it('Should be able to get one institution by name', async () => {
            const institution = await Institution.create(institutionMock)

            const { body, statusCode } = await request(app)
                .get(`/institution/name/${institutionMock.name}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body.age).toBe(institution._doc.age)
            expect(body.name).toBe(institution._doc.name)
            expect(body.email).toBe(institution._doc.email)
            expect(body.cpf).toBe(institution._doc.cpf)
        })

        it('Should be able to delete one institution by id', async () => {
            const institution = await Institution.create(institutionMock)

            const { statusCode } = await request(app)
                .del(`/institution/${institution._id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)

            const institutionDeleted = await Institution.findOne({ _id: institution._id })
            expect(institutionDeleted).toBeNull()
        })
    })

    describe('FAIL CASES', () => {
        it('Should not be able to create institution if the cnpj is not a string', async () => {
            const { body, statusCode } = await request(app)
                .post(`/institution`)
                .set('x-api-key', process.env.X_API_KEY)
                .send({ ...institutionMock, cnpj: 132 })

            expect(statusCode).toBe(400)

            expect(body.message[0]).toBe('Erro de validação: O atributo cnpj deve ser um(a) string ao invés de number')
        })

        it('Should not be able to create institution If there is already an institution for that cnpj', async () => {
            await Institution.create(institutionMock)
            const { body, statusCode } = await request(app)
                .post(`/institution`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(institutionMock)

            expect(statusCode).toBe(404)
            expect(body.message).toBe('Já existe um cnpj cadastrado para essa instituição')
        })

        it('Should not be able to find institution by id if doesnt exist', async () => {
            const objectId = '661dc2775e1a6a0f5591bff1'
            const { body, statusCode } = await request(app)
                .get(`/institution/${objectId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`instituição com id ${objectId} não encontrado`)
        })

        it('Should not be able to find institution by id if objectId is invalid', async () => {
            const objectId = 'invalid'
            const { body, statusCode } = await request(app)
                .get(`/institution/${objectId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`${objectId} não é um id válido`)
        })

        it('Should not be able to find institution by name if not exist', async () => {
            const institutionName = 'invalid'
            const { body, statusCode } = await request(app)
                .get(`/institution/name/${institutionName}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`Instituição com nome ${institutionName} não encontrado`)
        })

        it('Should not be able to update institution if cnpj is wrong', async () => {
            const bodyToUpdate = { ...institutionMock, cnpj: 123 }

            const institution = await Institution.create(institutionMock)

            const { body, statusCode } = await request(app)
                .put(`/institution/${institution._id}`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(bodyToUpdate)

            expect(statusCode).toBe(400)
            expect(body.message[0]).toBe(`Erro de validação: O atributo cnpj deve ser um(a) string ao invés de number`)
        })

        it('Should not be able to delete institution doc if document no exist', async () => {
            const randomId = '6623d5ed2cd2b6a2b1805c6f'

            const { body, statusCode } = await request(app)
                .del(`/institution/${randomId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.error).toBe(`Institution com id ${randomId} não encontrado`)
        })
    })
})
