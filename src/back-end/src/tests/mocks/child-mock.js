const mongoose = require('mongoose')

module.exports = {
    childMock: {
        name: 'João',
        age: 25,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        institution: new mongoose.Types.ObjectId(),
        entryData: new Date('2023-10-15'),
        address: {
            street: 'Rua das Flores',
            city: 'São Paulo',
            country: 'Brazil',
        },
        createdAt: new Date('2023-10-15T10:00:00Z'),
        updatedAt: null,
    },
}
