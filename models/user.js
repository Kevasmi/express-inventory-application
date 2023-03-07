const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, maxLength: 50, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  avatar: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
