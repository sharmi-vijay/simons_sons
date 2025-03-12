const express = require('express');
const router = express.Router();
const { addContact} = require('../controller/contactController');

// Define routes for contact operations
router.route('/add').post(addContact);

module.exports = router;
