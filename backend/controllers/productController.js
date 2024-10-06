const Product = require("../models/Product");

const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    oldPrice,
    discount,
    category,
    type,
    isFeatured,
  } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  const features = req.body.features ? req.body.features : [];

  const newProduct = new Product({
    name,
    description,
    price,
    oldPrice,
    discount,
    category,
    image,
    features,
    type,
    isFeatured,
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar el producto." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos." });
  }
};

const highlightProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.isFeatured = !product.isFeatured;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al destacar el producto" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    oldPrice,
    discount,
    category,
    type,
    isFeatured,
  } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  const features = req.body.features ? req.body.features : [];

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        oldPrice,
        discount,
        category,
        image,
        features,
        type,
        isFeatured,
      },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto." });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto." });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  highlightProduct,
};
