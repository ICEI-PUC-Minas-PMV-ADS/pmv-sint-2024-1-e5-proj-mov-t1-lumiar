const ChildModel = require('../models/child')
const SponsorModel = require('../models/sponsor')

class DonationService {
    static async existChild(idChild) {
        return ChildModel.exists({ _id: idChild })
    }

    static async existSponsor(idSponsor) {
        return SponsorModel.exists({ _id: idSponsor })
    }
}

module.exports = DonationService
