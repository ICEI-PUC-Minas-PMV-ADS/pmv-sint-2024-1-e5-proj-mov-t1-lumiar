const ChildrenModel = require("../models/children");
const GodfatherModel = require("../models/godfather");

class DonationService {
  static async existChild(child) {
    return ChildrenModel.exists(child);
  }

  static async existGodfather(godfather) {
    return GodfatherModel.exists(godfather);
  }
}

module.exports = DonationService;
