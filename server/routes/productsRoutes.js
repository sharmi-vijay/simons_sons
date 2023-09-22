const express = require('express')
const router = express.Router();
const {addProduct, getAllProducts, updateProduct, deleteProduct} = require('../controller/productsController')

router.route('/add').post(addProduct);
router.route('/getall').get(getAllProducts);
router.route('/update/:id').put(updateProduct);
router.route('/delete/:id').delete(deleteProduct);

module.exports = router;