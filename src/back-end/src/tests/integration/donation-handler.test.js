require('dotenv').config({ path: '.env.test' })

const Donation = require('../../models/donation')
const Child = require('../../models/child')
const Sponsor = require('../../models/sponsor')

const { sponsorMock } = require('../mocks/sponsor-mock')
const { childMock } = require('../mocks/child-mock')
const { donationMock } = require('../mocks/donation-mock')

const request = require('supertest')
const app = require('../app')

describe('Donation handler test', () => {
    beforeEach(async () => {
        await Donation.deleteMany({})
        await Sponsor.deleteMany({})
        await Child.deleteMany({})
    })

    describe('SUCCESS CASES', () => {
        it('Should be able to create a donation', async () => {
            const sponsor = await Sponsor.create(sponsorMock)
            const child = await Child.create(childMock)

            const donationBody = {
                value: 100,
                child: child._id,
                sponsor: sponsor._id,
            }

            const { body, statusCode } = await request(app)
                .post(`/create-donation`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(donationBody)

            const donation = await Donation.findOne({ _id: body.data._id }).lean()

            expect(statusCode).toBe(200)
            expect(JSON.parse(JSON.stringify(body.data))).toMatchObject(JSON.parse(JSON.stringify(donation)))
        })

        it('Should be able to get all donation by sponsor', async () => {
            const sponsor = await Sponsor.create(sponsorMock)

            await Donation.create({ ...donationMock, sponsor: sponsor._id })
            await Donation.create({ ...donationMock, value: 200, sponsor: sponsor._id })
            await Donation.create({ ...donationMock, value: 300, sponsor: sponsor._id })

            const { body, statusCode } = await request(app)
                .get(`/get-donation/sponsor/${sponsor._id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body.data).toHaveLength(3)
            expect(body.data.every((data) => data.sponsor === String(sponsor._id))).toBe(true)
        })

        it('Should be able to get all donation by child', async () => {
            const child = await Child.create(childMock)

            await Donation.create({ ...donationMock, child: child._id })
            await Donation.create({ ...donationMock, value: 200, child: child._id })
            await Donation.create({ ...donationMock, value: 300, child: child._id })

            const { body, statusCode } = await request(app)
                .get(`/get-donation/child/${child._id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(200)
            expect(body.data).toHaveLength(3)
            expect(body.data.every((data) => data.child === String(child._id))).toBe(true)
        })
    })

    describe('FAIL CASES', () => {
        it('Should not be able to create donation, if not have child', async () => {
            const sponsor = await Sponsor.create(sponsorMock)

            const donationBody = {
                value: 100,
                sponsor: sponsor._id,
            }

            const { body, statusCode } = await request(app)
                .post(`/create-donation`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(donationBody)

            expect(statusCode).toBe(400)
            expect(body.message[0]).toBe(
                'Erro de validação: O atributo child deve ser um(a) string ao invés de undefined',
            )
        })

        it('should not be able to create donation, if id of child not correct', async () => {
            const sponsor = await Sponsor.create(sponsorMock)
            const child = '6623d5ed2cd2b6a2b1805c6f'

            const donationBody = {
                value: 100,
                sponsor: sponsor._id,
                child,
            }

            const { body, statusCode } = await request(app)
                .post(`/create-donation`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(donationBody)

            expect(statusCode).toBe(400)
            expect(body.message).toBe('Não existe criança ou padrinho para processar a doação')
        })

        it('Should not be able to get all donation by sponsor if id is empty', async () => {
            const id = 'invalidTest'
            const { body, statusCode } = await request(app)
                .get(`/get-donation/sponsor/${id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe('Id invalido ou inexistente, gentileza informar')
        })

        it('Should not be able to get all donation by child if id is empty', async () => {
            const id = 'invalidTest'
            const { body, statusCode } = await request(app)
                .get(`/get-donation/child/${id}`)
                .set('x-api-key', process.env.X_API_KEY)

            expect(statusCode).toBe(404)
            expect(body.message).toBe('Id invalido ou inexistente, gentileza informar')
        })
    })
})
