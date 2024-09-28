const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalPrice: Number,
});

module.exports = mongoose.model('Cart', CartSchema);
