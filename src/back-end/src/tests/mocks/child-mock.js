const mongoose = require('mongoose')

module.exports = {
    childMock: {
        name: 'João',
        age: 12,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        institution: new mongoose.Types.ObjectId(),
        entryData: new Date('2023-01-01'),
        address: {
            street: '123 Main St',
            district: 'Downtown',
            state: 'California',
            country: 'USA',
            cep: '12345-678',
        },
        createdAt: new Date('2023-10-15T10:00:00Z'),
        updatedAt: null,
    },
}
