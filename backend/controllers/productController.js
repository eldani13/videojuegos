const Product = require('../models/Product');

const addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  const newProduct = new Product({
    name,
    description,
    price,
    image,
  });

  await newProduct.save();
  res.json(newProduct);
};

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  const updatedProduct = await Product.findByIdAndUpdate(id, {
    name,
    description,
    price,
    image,
  }, { new: true });

  if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
  
  res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
  
  res.json({ message: 'Producto eliminado exitosamente' });
};

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct };
