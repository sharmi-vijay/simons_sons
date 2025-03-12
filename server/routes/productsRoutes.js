const express = require('express')
const router = express.Router();
const { addProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails, addReview } = require('../controller/productsController')
const jwtAuthChecker = require("../middleware/jwtAuthChecker")

router.route('/add').post(jwtAuthChecker, addProduct);
router.route('/getall').get(jwtAuthChecker, getAllProducts);
router.route('/update/:id').put(updateProduct);
router.route('/delete/:id').delete(deleteProduct);

router.route("/:id").get(getProductDetails);
router.route("/:id/reviews").post(jwtAuthChecker, addReview);

module.exports = router;
