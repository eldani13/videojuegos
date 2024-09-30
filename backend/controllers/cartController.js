const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    // Buscar si existe el carrito
    let cart = await Cart.findOne();

    // Buscar el producto por ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Si no existe el carrito, crear uno nuevo
    if (!cart) {
      cart = new Cart({ products: [], totalPrice: 0 });
    }

    // Agregar el producto al carrito y actualizar el precio total
    cart.products.push(product);
    cart.totalPrice += product.price;
    
    // Guardar el carrito actualizado
    await cart.save();

    // Enviar respuesta exitosa con el carrito actualizado
    res.status(200).json({ message: 'Producto añadido al carrito', cart });
    
  } catch (error) {
    console.error("Error al añadir al carrito:", error);
    res.status(500).json({ message: "Error al añadir producto al carrito" });
  }
};

const getCart = async (req, res) => {
  try {
    // Buscar el carrito y hacer un populate de los productos
    const cart = await Cart.findOne().populate('products');
    res.json(cart || { products: [], totalPrice: 0 });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ message: "Error al obtener el carrito" });
  }
};

module.exports = { addToCart, getCart };
