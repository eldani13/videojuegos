const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/products', upload.single('image'), addProduct);
router.get('/products', getAllProducts);

module.exports = router;
