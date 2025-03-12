const { request, response } = require("express");
const productsModel = require("../model/productsModel");

// CREATE
const addProduct = async (request, response) => {
  const data = await productsModel.create(request.body);
  response.json({ addedProduct: data, message: "Product added!" });
};

// READ
const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateProduct = async (request, response) => {
  const data = await productsModel.findByIdAndUpdate(
    request.params.id,
    request.body
  );
  if (data) {
    response.json({
      deletedProduct: data,
      message: "Product updated successfully!",
    });
  } else {
    response.send("Product not found!");
  }
};

// DELETE
const deleteProduct = async (request, response) => {
  const data = await productsModel.findByIdAndDelete(request.params.id);
  if (data) {
    response.json({
      deletedProduct: data,
      message: "Product deleted successfully!",
    });
  } else {
    response.send("Product not found!");
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await productsModel.findById(id).populate("reviews.user", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const product = await productsModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user has already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    // Add review
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    // Update average rating
    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    product.averageRating = totalRating / product.reviews.length;

    await product.save();

    res.json({ message: "Review added successfully!", updatedProduct: product });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};



module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails, addReview };
