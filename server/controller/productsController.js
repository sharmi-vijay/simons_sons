const { request, response } = require("express");
const productsModel = require("../model/productsModel");

// CREATE
const addProduct = async (request, response) => {
  const data = await productsModel.create(request.body);
  response.json({ addedProduct: data, message: "Product added!" });
};

// READ
const getAllProducts = async (_, response) => {
  const data = await productsModel.find();
  response.json(data);
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

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct };
