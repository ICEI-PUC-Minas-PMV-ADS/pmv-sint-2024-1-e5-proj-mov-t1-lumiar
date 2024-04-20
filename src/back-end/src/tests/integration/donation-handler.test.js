require('dotenv').config({ path: '.env.test' })

const Donation = require('../../models/donation')
const Children = require('../../models/children')
const Godfather = require('../../models/godfather')

const { godfatherMock } = require('../mocks/godfather-mock')
const { childrenMock } = require('../mocks/children-mock')

const request = require('supertest')
const app = require('../app')

describe('Donation handler test', () => {
    beforeEach(async () => {
        await Donation.deleteMany({})
        await Godfather.deleteMany({})
        await Children.deleteMany({})
    })

    describe('SUCCESS CASES', () => {
        it('Should be able to create a donation', async () => {
            const godfather = await Godfather.create(godfatherMock)
            const child = await Children.create(childrenMock)

            const donationBody = {
                value: 100,
                child: child._id,
                godfather: godfather._id,
            }

            const { body, statusCode } = await request(app)
                .post(`/create-donation`)
                .set('x-api-key', process.env.X_API_KEY)
                .send(donationBody)

            const donation = await Donation.findOne({ _id: body.data._id }).lean()

            expect(statusCode).toBe(200)
            expect(JSON.parse(JSON.stringify(body.data))).toMatchObject(JSON.parse(JSON.stringify(donation)))
        })

        describe('FAIL CASES', () => {
            it('Should not be able to create donation, if not have child', async () => {
                const godfather = await Godfather.create(godfatherMock)

                const donationBody = {
                    value: 100,
                    godfather: godfather._id,
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
                const godfather = await Godfather.create(godfatherMock)
                const child = '6623d5ed2cd2b6a2b1805c6f'

                const donationBody = {
                    value: 100,
                    godfather: godfather._id,
                    child,
                }

                const { body, statusCode } = await request(app)
                    .post(`/create-donation`)
                    .set('x-api-key', process.env.X_API_KEY)
                    .send(donationBody)

                expect(statusCode).toBe(400)
                expect(body.message).toBe('Não existe criança ou padrinho para processar a doação')
            })
        })
    })
})
