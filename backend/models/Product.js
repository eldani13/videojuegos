const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  oldPrice: Number,
  discount: Number,
  price: Number,
  category: String,
  image: String,
});

module.exports = mongoose.model('Product', ProductSchema);
