const mongoose = require('mongoose')

module.exports = {
    sponsorMock: {
        name: 'Vito Corleone',
        age: 50,
        email: 'vito@example.com',
        cpf: '140.334.946-00',
        donations: {
            Ana: new mongoose.Types.ObjectId(),
        },
        password: '1234512312',
    },
}
