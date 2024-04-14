const mongoose = require('mongoose')

module.exports = {
    godfatherMock: {
        name: 'Vito Corleone',
        age: 50,
        email: 'vito@example.com',
        cpf: '140.334.946-00',
        donations: {
            Ana: mongoose.Types.ObjectId,
        },
    },
}
