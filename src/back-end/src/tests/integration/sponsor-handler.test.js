require('dotenv').config({ path: '.env.test' })

const Sponsor = require('../../models/sponsor')

const { sponsorMock } = require('../mocks/sponsor-mock')

const request = require('supertest')
const app = require('../app')

describe('Sponsor handler test', () => {
    beforeEach(async () => {
        await Sponsor.deleteMany({})
    })

    describe('SUCCESS CASES', () => {
        it('Should be able to create a sponsor', async () => {
            const { body, statusCode } = await request(app)
                .post(`/sponsor`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(sponsorMock)

            expect(statusCode).toBe(200)

            const sponsor = await Sponsor.findOne({ name: sponsorMock.name }).lean()
            expect(body.age).toBe(sponsor.age)
            expect(body.name).toBe(sponsor.name)
            expect(body.email).toBe(sponsor.email)
            expect(body.cpf).toBe(sponsor.cpf)
        })

        it('Should be able to update a sponsor', async () => {
            const sponsor = await Sponsor.create(sponsorMock)

            const newSponsor = { ...sponsorMock, name: 'New Name' }

            const { body, statusCode } = await request(app)
                .put(`/sponsor/${sponsor._id}`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(newSponsor)

            expect(statusCode).toBe(200)

            const sponsorUpdated = await Sponsor.findOne({ _id: sponsor._id }).lean()
            expect(body.name).toBe(sponsorUpdated.name)
        })

        it('Should be able to get all sponsor registered', async () => {
            await Sponsor.create(sponsorMock)
            await Sponsor.create({ ...sponsorMock, cpf: '091.952.320-01' })
            await Sponsor.create({ ...sponsorMock, cpf: '561.799.850-14' })

            const { body, statusCode } = await request(app).get(`/sponsor`).set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body).toHaveLength(3)
            expect(body.every((doc) => doc.name === 'Vito Corleone')).toBe(true)
        })

        it('Should be able to get one sponsor by id', async () => {
            const sponsor = await Sponsor.create(sponsorMock)

            const { body, statusCode } = await request(app)
                .get(`/sponsor/${sponsor._id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body.age).toBe(sponsor._doc.age)
            expect(body.name).toBe(sponsor._doc.name)
            expect(body.email).toBe(sponsor._doc.email)
            expect(body.cpf).toBe(sponsor._doc.cpf)
        })

        it('Should be able to get one sponsor by name', async () => {
            const sponsor = await Sponsor.create(sponsorMock)

            const { body, statusCode } = await request(app)
                .get(`/sponsor/name/${sponsorMock.name}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body.age).toBe(sponsor._doc.age)
            expect(body.name).toBe(sponsor._doc.name)
            expect(body.email).toBe(sponsor._doc.email)
            expect(body.cpf).toBe(sponsor._doc.cpf)
        })

        it('Should be able to delete one sponsor by id', async () => {
            const sponsor = await Sponsor.create(sponsorMock)

            const { statusCode } = await request(app)
                .del(`/sponsor/${sponsor._id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)

            const sponsorDeleted = await Sponsor.findOne({ _id: sponsor._id })
            expect(sponsorDeleted).toBeNull()
        })
    })

    describe('FAIL CASES', () => {
        it('Should not be able to create sponsor if the age is not a number', async () => {
            const { body, statusCode } = await request(app)
                .post(`/sponsor`)
                .set('x-api-key', process.env.X_API_KEY)
                .send({ ...sponsorMock, age: 'test' })

            expect(statusCode).toBe(400)

            expect(body.message[0]).toBe('Erro de validação: O atributo age deve ser um(a) number ao invés de string')
        })

        it('Should not be able to create sponsor if the email is not correct', async () => {
            const { body, statusCode } = await request(app)
                .post(`/sponsor`)
                .set('x-api-key', process.env.X_API_KEY)
                .send({ ...sponsorMock, email: 'testIncorrectEmail' })

            expect(statusCode).toBe(400)

            expect(body.message[0]).toBe(
                'Erro de validação: O atributo email deve ser um(a) email ao invés de testIncorrectEmail',
            )
        })

        it('Should not be able to create sponsor if the cpf is not correct', async () => {
            const { body, statusCode } = await request(app)
                .post(`/sponsor`)
                .set('x-api-key', process.env.X_API_KEY)
                .send({ ...sponsorMock, cpf: 'test' })

            expect(statusCode).toBe(400)

            expect(body.message[0]).toBe('Erro de validação: O atributo cpf deve ser um(a) cpf ao invés de test')
        })

        it('Should not be able to find sponsor by id if doesnt exist', async () => {
            const objectId = '661dc2775e1a6a0f5591bff1'
            const { body, statusCode } = await request(app)
                .get(`/sponsor/${objectId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`padrinho com id ${objectId} não encontrado`)
        })

        it('Should not be able to find sponsor by id if objectId is invalid', async () => {
            const objectId = 'invalid'
            const { body, statusCode } = await request(app)
                .get(`/sponsor/${objectId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`${objectId} não é um id válido`)
        })

        it('Should not be able to find sponsor by name if not exist', async () => {
            const sponsorName = 'invalid'
            const { body, statusCode } = await request(app)
                .get(`/sponsor/name/${sponsorName}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`Padrinho com nome ${sponsorName} não encontrado`)
        })

        it('Should not be able to update sponsor if cpf is wrong', async () => {
            const bodyToUpdate = { ...sponsorMock, cpf: 'testIncorrectCpf' }

            const sponsor = await Sponsor.create(sponsorMock)

            const { body, statusCode } = await request(app)
                .put(`/sponsor/${sponsor._id}`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(bodyToUpdate)

            expect(statusCode).toBe(400)
            expect(body.message[0]).toBe(
                `Erro de validação: O atributo cpf deve ser um(a) cpf ao invés de ${bodyToUpdate.cpf}`,
            )
        })

        it('Should not be able to delete sponsor doc if document no exist', async () => {
            const randomId = '6623d5ed2cd2b6a2b1805c6f'

            const { body, statusCode } = await request(app)
                .del(`/sponsor/${randomId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.error).toBe(`Padrinho com id ${randomId} não encontrado`)
        })
    })
})
