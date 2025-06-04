const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const AccountSchema = new Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 20},
    email: {type: String, required: true, unique: true, minlength: 5, maxlength: 40},
    password: {type: String, required: true},
}, { timestamps: true })

const AccountModel = model('Account', AccountSchema)

module.exports = { AccountModel }

//////
// models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 50
//   },
//   email: {type: String,required: true,unique: true,lowercase: true},
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);