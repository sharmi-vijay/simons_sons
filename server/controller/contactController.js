const { request, response } = require("express");
const contactModel = require("../model/contactModel");

// CREATE
const addContact = async (request, response) => {
  try {
    const data = await contactModel.create(request.body);
    response.status(201).json({ addedContact: data, message: "Contact added!" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};


module.exports = { addContact};
