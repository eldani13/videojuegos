const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User'); 

const generateGuestUsername = () => {
  const randomNumber = Math.floor(Math.random() * 10000);
  return `Guest${randomNumber}`;
};

const addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let username = generateGuestUsername();

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, password: 'guest' }); 
      await user.save();
    }

    let cart = await Cart.findOne({ user: user._id });

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (!cart) {
      cart = new Cart({ user: user._id, products: [], totalPrice: 0 });
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
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products');
    res.json(cart || { products: [], totalPrice: 0 });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ message: "Error al obtener el carrito" });
  }
};

module.exports = { addToCart, getCart };
