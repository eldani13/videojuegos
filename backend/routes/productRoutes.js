const express = require('express');
const { addProduct, getAllProducts, updateProduct, deleteProduct, getProductById, highlightProduct } = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/products', upload.single('image'), addProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', upload.single('image'), updateProduct); 
router.delete('/products/:id', deleteProduct);
router.patch('/products/:id/highlight', highlightProduct);

module.exports = router;
