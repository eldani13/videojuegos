const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne();

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (!cart) {
      cart = new Cart({ products: [], totalPrice: 0 });
    }

    cart.products.push(product);
    cart.totalPrice += product.price;
    
    await cart.save();

    res.status(200).json({ message: 'Producto añadido al carrito', cart });
    
  } catch (error) {
    console.error("Error al añadir al carrito:", error);
    res.status(500).json({ message: "Error al añadir producto al carrito" });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('products');
    res.json(cart || { products: [], totalPrice: 0 });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ message: "Error al obtener el carrito" });
  }
};

module.exports = { addToCart, getCart };
