const Product = require('../models/Product');

const addProduct = async (req, res) => {
  const { name, description, price, category } = req.body; 
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  const newProduct = new Product({
    name,
    description,
    price,
    category, 
    image,
  });

  await newProduct.save();
  res.json(newProduct);
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos.' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;  
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,  
      image,
    }, { new: true });

    if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto.' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto.' });
  }
};

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct };
