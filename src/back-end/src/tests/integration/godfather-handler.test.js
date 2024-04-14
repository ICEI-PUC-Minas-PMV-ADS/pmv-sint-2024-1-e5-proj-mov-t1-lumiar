require('dotenv').config({ path: '.env.test' })

const Godfather = require('../../models/godfather')

const { godfatherMock } = require('../mocks/godfather-mock')

const request = require('supertest')
const app = require('../app')

describe('Godfather handler test', () => {
    beforeEach(async () => {
        await Godfather.deleteMany({})
    })

    describe('SUCCESS CASE', () => {
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
})
