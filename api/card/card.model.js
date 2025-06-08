const mongoose = require('mongoose');
const Schema = mongoose.Schema
const model = mongoose.model

const cardSchema = new Schema({
  list: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  title: { type: String, required: true },
  position: { type: Number, required: true },
  complete: { type: Boolean, default: false }

  // board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  // description: String,
  // labels: [{ type: String }],
  // dueDate: Date,
  // assignedTo: [{ type: Schema.Types.ObjectId, ref: 'Account' }]
}, { timestamps: true });

const CardModel = model('Card', cardSchema)
module.exports = { CardModel }