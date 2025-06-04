const mongoose = require('mongoose');
const Schema = mongoose.Schema
const model = mongoose.model

const boardSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
  title: {type: String, required: true},
  members: [{type: Schema.Types.ObjectId, ref: 'Account'}]
  // backgroundColor: { type: String, default: '#0079bf'} // Trello-like default
}, { timestamps: true });

// module.exports = mongoose.model('Board', boardSchema);
const BoardModel = model('Board', boardSchema)

module.exports = { BoardModel }