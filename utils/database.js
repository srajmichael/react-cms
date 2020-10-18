const mongoose = require('mongoose');
require('dotenv').config()

//MONGOOSE CONNECTION
const dbString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?authSource=${process.env.MONGO_AUTH_SOURCE}&retryWrites=true&w=majority`;
const dbOptions = {
   useNewUrlParser: true,
   useUnifiedTopology: true
}
const connection = mongoose.createConnection(dbString, dbOptions);

module.exports = connection;