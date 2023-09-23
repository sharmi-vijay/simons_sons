const express = require('express')
const router = express.Router();
const {createInvoice, getAllInvoices, deleteInvoice, searchInvoice} = require('../controller/invoicesController')

router.route('/add').post(createInvoice);
router.route('/getall').get(getAllInvoices);
router.route('/delete/:id').delete(deleteInvoice);
router.route('/search').post(searchInvoice);

module.exports = router;