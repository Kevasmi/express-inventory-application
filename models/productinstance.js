const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductInstanceSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', requried: true },
  status: {
    type: String,
    requried: true,
    enum: ['Poor', 'Fair', 'Good', 'Like New'],
    default: 'Like New',
  },
});

ProductInstanceSchema.virtual('url').get(function () {
  return `/catalog/productinstance/${this._id}`;
});

module.exports = mongoose.model('ProductInstance', ProductInstanceSchema);
