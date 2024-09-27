const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://localhost:27017/tienda", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error al conectarse a MongoDB:", err));

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", ProductSchema);

app.post("/products", upload.single("image"), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  const newProduct = new Product({
    name,
    description,
    price,
    image,
  });

  await newProduct.save();
  res.json(newProduct);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: err });
  }
});

app.put("/products/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const updatedProduct = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      image: req.file ? `/uploads/${req.file.filename}` : product.image,
    };

    await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.json({
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el producto", error: err });
  }
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
