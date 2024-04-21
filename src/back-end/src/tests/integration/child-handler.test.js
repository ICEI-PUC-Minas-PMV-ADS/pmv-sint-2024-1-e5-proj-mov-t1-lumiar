require('dotenv').config({ path: '.env.test' })

const Donation = require('../../models/donation')
const Child = require('../../models/child')
const Sponsor = require('../../models/sponsor')

const { sponsorMock } = require('../mocks/sponsor-mock')
const { donationMock } = require('../mocks/donation-mock')
const { childMock } = require('../mocks/child-mock')

const request = require('supertest')
const app = require('../app')

describe.skip('Child handler test', () => {
    beforeEach(async () => {
        await Donation.deleteMany({})
        await Sponsor.deleteMany({})
        await Child.deleteMany({})
    })

    describe('SUCCESS CASES', () => {
        it('Should be able to create a child', async () => {
            const { body, statusCode } = await request(app)
                .post(`/child`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(childMock)

            expect(statusCode).toBe(200)

            const child = await Child.findOne({ name: childMock.name }).lean()
            expect(body.age).toBe(child.age)
            expect(body.name).toBe(child.name)
        })

        it('Should be able to update a child', async () => {
            const child = await Child.create(childMock)

            const newChildData = { ...childMock, name: 'New Name' }

            const { body, statusCode } = await request(app)
                .put(`/child/${child._id}`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(newChildData)

            expect(statusCode).toBe(200)

            const updatedChild = await Child.findOne({ _id: child._id }).lean()
            expect(body.name).toBe(updatedChild.name)
        })

        it('Should be able to get all child registered', async () => {
            await Child.create(childMock)
            await Child.create({ ...childMock, name: 'Child 2' })
            await Child.create({ ...childMock, name: 'Child 3' })

            const { body, statusCode } = await request(app).get(`/child`).set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body).toHaveLength(3)
        })

        it('Should be able to get one child by id', async () => {
            const child = await Child.create(childMock)

            const { body, statusCode } = await request(app)
                .get(`/child/${child._id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body.name).toBe(child.name)
            expect(body.age).toBe(child.age)
        })

        it('Should be able to delete one child by id', async () => {
            const child = await Child.create(childMock)

            const { statusCode } = await request(app).del(`/child/${child._id}`).set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)

            const deletedChild = await Child.findOne({ _id: child._id })
            expect(deletedChild).toBeNull()
        })
    })
    describe('FAIL CASES', () => {
        it('Should not be able to create child if the age is not a number', async () => {
            const { body, statusCode } = await request(app)
                .post(`/child`)
                .set('x-api-key', process.env.X_API_KEY)
                .send({ ...childMock, age: 'twenty' })

            expect(statusCode).toBe(400)
            expect(body.message[0]).toBe('Erro de validação: O atributo age deve ser um(a) number ao invés de string')
        })

        it('Should not be able to create child if there is already a child with the same name', async () => {
            await Child.create(childMock)
            const { body, statusCode } = await request(app)
                .post(`/child`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(childMock)

            expect(statusCode).toBe(404)
            expect(body.message).toBe('Já existe uma criança cadastrada com este nome')
        })

        it('Should not be able to find child by id if it does not exist', async () => {
            const objectId = '661dc2775e1a6a0f5591bff1'
            const { body, statusCode } = await request(app)
                .get(`/child/${objectId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`Criança com id ${objectId} não encontrada`)
        })

        it('Should not be able to find child by id if objectId is invalid', async () => {
            const objectId = 'invalid'
            const { body, statusCode } = await request(app)
                .get(`/child/${objectId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe(`${objectId} não é um id válido`)
        })

        it('Should not be able to update child if age is wrong', async () => {
            const bodyToUpdate = { ...childMock, age: 'three' }

            const child = await Child.create(childMock)

            const { body, statusCode } = await request(app)
                .put(`/child/${child._id}`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(bodyToUpdate)

            expect(statusCode).toBe(400)
            expect(body.message[0]).toBe('Erro de validação: O atributo age deve ser um(a) number ao invés de string')
        })

        it('Should not be able to delete child document if document does not exist', async () => {
            const randomId = '6623d5ed2cd2b6a2b1805c6f'

            const { body, statusCode } = await request(app)
                .del(`/child/${randomId}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.error).toBe(`Criança com id ${randomId} não encontrada`)
        })
    })
})
