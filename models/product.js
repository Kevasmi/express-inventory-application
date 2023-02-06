const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  price: { type: Number, required: true },
  pieceCount: { type: Number, required: true },
  theme: { type: Schema.Types.ObjectId, ref: 'Theme', required: true },
  setNumber: { type: Number, required: true },
  difficulty: {
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

// Virtual for product's URL
ProductSchema.virtual('url').get(function () {
  // We don't use an arrow function because we need access to the this object.
  return `/catalog/product/${this._id}`;
});

module.exports = mongoose.model('Product', ProductSchema);
