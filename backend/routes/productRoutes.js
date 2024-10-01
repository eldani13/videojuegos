const express = require('express');
const { addProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/products', upload.single('image'), addProduct);
router.get('/products', getAllProducts);
router.put('/products/:id', upload.single('image'), updateProduct); 
router.delete('/products/:id', deleteProduct);

module.exports = router;
