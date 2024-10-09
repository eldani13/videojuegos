const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  oldPrice: Number,
  discount: Number,
  price: Number,
  category: String,
  image: String,
  features: [String],
  type: String,
  isFeatured: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', ProductSchema);
