const mongoose = require("mongoose");

class MongoDb {
  static createConnection() {
    const options = {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 20000,
      connectTimeoutMS: 15000,
      maxPoolSize: 1,
      minPoolSize: 1,
      family: 4,
    };

    return mongoose.createConnection(
      process.env.MONGO_STRING_CONNECTION,
      options
    );
  }
}

module.exports = MongoDb;
