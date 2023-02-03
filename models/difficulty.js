const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DifficultySchema = new Schema({
  level: {
    type: String,
    required: true,
    enum: [
      '0 - Beginner',
      '1 - Intermediate',
      '2 - Advanced',
      '3 - Expert',
      '4 - Master',
    ],
  },
});

// Virtual for difficulty's URL
DifficultySchema.virtual('url').get(function () {
  // We don't use an arrow function because we need access to the this object.
  return `/catalog/difficulty/${this._id}`;
});

module.exports = mongoose.model('Difficulty', DifficultySchema);
