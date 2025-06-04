const mongoose = require('mongoose');
const Schema = mongoose.Schema
const model = mongoose.model

const listSchema = new Schema({
  board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  title: { type: String, required: true }
  // position: { type: Number, required: true }
}, { timestamps: true });

const ListModel = model('List', listSchema)
module.exports = { ListModel }