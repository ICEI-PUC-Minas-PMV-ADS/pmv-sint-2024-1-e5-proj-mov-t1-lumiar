const mongoose = require('mongoose')

module.exports = {
    donationMock: {
        value: 100,
        child: new mongoose.Types.ObjectId(),
        sponsor: new mongoose.Types.ObjectId(),
        createdAt: new Date('2024-04-20T08:00:00Z'),
    },
}
