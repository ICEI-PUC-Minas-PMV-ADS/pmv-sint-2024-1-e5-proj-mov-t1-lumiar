const mongoose = require('mongoose')

module.exports = {
    donationMock: {
        value: 100,
        children: mongoose.Types.ObjectId,
        godfather: mongoose.Types.ObjectId,
        createdAt: new Date('2024-04-20T08:00:00Z'),
    },
}
