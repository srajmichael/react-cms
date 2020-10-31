const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeChunkSchema = new Schema({
   title: { type: String, required: true },
   description: { type: String },
   code: {type: String},
   date: { type: Date, default: Date.now },
   author: { type: Schema.ObjectId, ref: 'User' },
   approved: {type: Boolean, default: false}
});

module.exports = mongoose.model('CodeChunk', CodeChunkSchema);