const mongoose = require('mongoose');

const invoicesModel = mongoose.Schema({
    customerId: {type: String},
    customerName: {type:String},
    phone: {type:String},
    email: {type:String},
    address: {type:String},
    products: { type: Array },
    // quantity:{type: String},
    date: {type: String},
    deliveryDate: {type: String},
    totalCost: {type:String}
});

module.exports = mongoose.model('invoices', invoicesModel)