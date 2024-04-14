const mongoose = require('mongoose')

jest.setTimeout(60000)

afterAll(async () => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 5))
    await mongoose.disconnect()
})
