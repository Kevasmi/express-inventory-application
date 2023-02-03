const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThemeSchema = new Schema({
  name: { type: String, maxLength: 100, required: true },
});

// Virtual for theme's URL
ThemeSchema.virtual('url').get(function () {
  // We don't use an arrow function because we need access to the this object.
  return `/catalog/theme/${this._id}`;
});

module.exports = mongoose.model('Theme', ThemeSchema);
