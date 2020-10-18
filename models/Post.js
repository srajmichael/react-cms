const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   title: { type: String, required: true },
   date: { type: Date, default: Date.now },
   content: String,
   permalink: { type: String, required: true, unique: true },
   author: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Post', PostSchema);