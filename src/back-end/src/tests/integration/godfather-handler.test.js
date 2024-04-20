require('dotenv').config({ path: '.env.test' })

const Godfather = require('../../models/godfather')

const { godfatherMock } = require('../mocks/godfather-mock')

const request = require('supertest')
const app = require('../app')

describe('Godfather handler test', () => {
    beforeEach(async () => {
        await Godfather.deleteMany({})
    })

    describe('SUCCESS CASES', () => {
        it('Should be able to create a godfather', async () => {
            const { body, statusCode } = await request(app)
                .post(`/godfather`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(godfatherMock)

            expect(statusCode).toBe(200)

            const godfather = await Godfather.findOne({ name: godfatherMock.name }).lean()
            expect(body.age).toBe(godfather.age)
            expect(body.name).toBe(godfather.name)
            expect(body.email).toBe(godfather.email)
            expect(body.cpf).toBe(godfather.cpf)
        })

        it('Should be able to update a godfather', async () => {
            const godfather = await Godfather.create(godfatherMock)

            const newGodfather = { ...godfatherMock, name: 'New Name' }

            const { body, statusCode } = await request(app)
                .put(`/godfather/${godfather._id}`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(newGodfather)

            expect(statusCode).toBe(200)

            const godfatherUpdated = await Godfather.findOne({ _id: godfather._id }).lean()
            expect(body.name).toBe(godfatherUpdated.name)
        })

        it('Should be able to get all godfather registered', async () => {
            await Godfather.create(godfatherMock)
            await Godfather.create({ ...godfatherMock, cpf: '091.952.320-01' })
            await Godfather.create({ ...godfatherMock, cpf: '561.799.850-14' })

            const { body, statusCode } = await request(app).get(`/godfather`).set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body).toHaveLength(3)
            expect(body.every((doc) => doc.name === 'Vito Corleone')).toBe(true)
        })

        it('Should be able to get one godfather by id', async () => {
            const godfather = await Godfather.create(godfatherMock)

            const { body, statusCode } = await request(app)
                .get(`/godfather/${godfather._id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body.age).toBe(godfather._doc.age)
            expect(body.name).toBe(godfather._doc.name)
            expect(body.email).toBe(godfather._doc.email)
            expect(body.cpf).toBe(godfather._doc.cpf)
        })

        it('Should be able to get one godfather by name', async () => {
            const godfather = await Godfather.create(godfatherMock)

            const { body, statusCode } = await request(app)
                .get(`/godfather/name/${godfatherMock.name}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body.age).toBe(godfather._doc.age)
            expect(body.name).toBe(godfather._doc.name)
            expect(body.email).toBe(godfather._doc.email)
            expect(body.cpf).toBe(godfather._doc.cpf)
        })

        it('Should be able to delete one godfather by id', async () => {
            const godfather = await Godfather.create(godfatherMock)

            const { statusCode } = await request(app)
                .del(`/godfather/${godfather._id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)

            const godfatherDeleted = await Godfather.findOne({ _id: godfather._id })
            expect(godfatherDeleted).toBeNull()
        })
    })

    describe('FAIL CASES', () => {
        it('Should not be able to create godfather if the age is not a number', async () => {
            const { body, statusCode } = await request(app)
                .post(`/godfather`)
                .set('x-api-key', process.env.X_API_KEY)
                .send({ ...godfatherMock, age: 'test' })

            expect(statusCode).toBe(400)

            expect(body.message[0]).toBe('Erro de validação: O atributo age deve ser um(a) number ao invés de string')
        })

        it('Should not be able to create godfather if the email is not correct', async () => {
            const { body, statusCode } = await request(app)
                .post(`/godfather`)
                .set('x-api-key', process.env.X_API_KEY)
                .send({ ...godfatherMock, email: 'testIncorrectEmail' })

            expect(statusCode).toBe(400)

            expect(body.message[0]).toBe(
                'Erro de validação: O atributo email deve ser um(a) email ao invés de testIncorrectEmail',
            )
        })

        it('Should not be able to create godfather if the cpf is not correct', async () => {
            const { body, statusCode } = await request(app)
                .post(`/godfather`)
                .set('x-api-key', process.env.X_API_KEY)
                .send({ ...godfatherMock, cpf: 'test' })

            expect(statusCode).toBe(400)

            expect(body.message[0]).toBe('Erro de validação: O atributo cpf deve ser um(a) cpf ao invés de test')
        })

        it('Should not be able to find godfather by id if doesnt exist', async () => {
            const objectId = '661dc2775e1a6a0f5591bff1'
            const { body, statusCode } = await request(app)
                .get(`/godfather/${objectId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`padrinho com id ${objectId} não encontrado`)
        })

        it('Should not be able to find godfather by id if objectId is invalid', async () => {
            const objectId = 'invalid'
            const { body, statusCode } = await request(app)
                .get(`/godfather/${objectId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`${objectId} não é um id válido`)
        })

        it('Should not be able to find godfather by name if not exist', async () => {
            const godfatherName = 'invalid'
            const { body, statusCode } = await request(app)
                .get(`/godfather/name/${godfatherName}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`Padrinho com nome ${godfatherName} não encontrado`)
        })

        it('Should not be able to update godfather if cpf is wrong', async () => {
            const bodyToUpdate = { ...godfatherMock, cpf: 'testIncorrectCpf' }

            const godfather = await Godfather.create(godfatherMock)

            const { body, statusCode } = await request(app)
                .put(`/godfather/${godfather._id}`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(bodyToUpdate)

            expect(statusCode).toBe(400)
            expect(body.message[0]).toBe(
                `Erro de validação: O atributo cpf deve ser um(a) cpf ao invés de ${bodyToUpdate.cpf}`,
            )
        })

        it('Should not be able to delete godfather doc if document no exist', async () => {
            const randomId = '6623d5ed2cd2b6a2b1805c6f'

            const { body, statusCode } = await request(app)
                .del(`/godfather/${randomId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.error).toBe(`Padrinho com id ${randomId} não encontrado`)
        })
    })
})
