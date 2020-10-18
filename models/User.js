const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;

const connection = require('../utils/database');

const UserSchema = new Schema({
   firstName: { type: String, required: true },
   lastName: String,
   email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
   phone: { type:  String },
   password: { type: String, required: true },
   registeredDate: { type: Date, default: Date.now }
});

module.exports = connection.model('User', UserSchema);
