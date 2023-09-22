const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {type: String},
    brand: {type: String},
    price: {type: String},
    image: {type:String},
    category: {type: String}
});

module.exports = mongoose.model('products', productsSchema)