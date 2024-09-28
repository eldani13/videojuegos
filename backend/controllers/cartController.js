const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne();

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  if (!cart) {
    cart = new Cart({ products: [], totalPrice: 0 });
  }

  cart.products.push(product);
  cart.totalPrice += product.price;
  await cart.save();

  res.json(cart);
};

const getCart = async (req, res) => {
  const cart = await Cart.findOne().populate('products');
  res.json(cart || { products: [], totalPrice: 0 });
};

module.exports = { addToCart, getCart };
