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


module.exports = { addProduct, getAllProducts };
