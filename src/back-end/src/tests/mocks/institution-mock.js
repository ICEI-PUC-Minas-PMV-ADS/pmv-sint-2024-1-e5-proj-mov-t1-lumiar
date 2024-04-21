const mongoose = require('mongoose')

module.exports = {
    institutionMock: {
        name: 'Test User',
        password: 'password123',
        creationDate: new Date('2023-01-01').toISOString(),
        email: 'test@example.com',
        cnpj: '12345678901234',
        child: {
            John: new mongoose.Types.ObjectId(),
            Patrick: new mongoose.Types.ObjectId(),
        },
        description: 'Lorem ipsum dolor sit amet',
        address: {
            street: '123 Main St',
            district: 'Downtown',
            state: 'California',
            country: 'USA',
            cep: '12345-678',
        },
        affiliation: true,
        createdAt: new Date('2023-01-01').toISOString(),
        updatedAt: null,
    },
}
