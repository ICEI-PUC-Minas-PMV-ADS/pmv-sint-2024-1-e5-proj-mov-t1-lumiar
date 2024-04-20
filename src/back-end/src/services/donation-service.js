const ChildrenModel = require('../models/children')
const GodfatherModel = require('../models/godfather')

class DonationService {
    static async existChild(idChild) {
        return ChildrenModel.exists({ _id: idChild })
    }

    static async existGodfather(idGodfather) {
        return GodfatherModel.exists({ _id: idGodfather })
    }
}

module.exports = DonationService
