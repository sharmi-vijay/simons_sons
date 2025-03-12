const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true }, // User's name
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const productsSchema = mongoose.Schema({
    name: { type: String },
    brand: { type: String },
    price: { type: String },
    image: { type: String },
    category: { type: String },
    description: String,
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('products', productsSchema)