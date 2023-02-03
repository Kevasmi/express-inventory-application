const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  price: { type: Number, required: true },
  pieceCount: { type: Number },
  theme: { type: Schema.Types.ObjectId, ref: 'Theme', required: true },
  difficulty: {
    type: Schema.Types.ObjectId,
    ref: 'Difficulty',
    required: true,
  },
});

// Virtual for product's URL
ProductSchema.virtual('url').get(function () {
  // We don't use an arrow function because we need access to the this object.
  return `/catalog/product/${this._id}`;
});

module.exports = mongoose.model('Product', ProductSchema);
