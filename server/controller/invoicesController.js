const invoicesModel = require("../model/invoicesModel");

// CREATE
const createInvoice = async (request, response) => {
  const data = await invoicesModel.create(request.body);
  response.json({ addedInvoice: data, message: "Invoice created!" });
};

// READ
const getAllInvoices = async (request, response) => {
  const userId = request.header("customerId");

  const data = await invoicesModel.find({customerId: userId});
  response.json(data);
  // console.log(userId)
};

// DELETE
const deleteInvoice = async (request, response) => {
  const data = await invoicesModel.findByIdAndDelete(request.params.id);
  if (data) {
    response.json({
      deletedInvoice: data,
      message: "Invoice record deleted successfully!",
    });
  } else {
    response.send("Invoice record not found!");
  }
};

// SEARCH
const searchInvoice = async (request, response) => {
  const userId = request.header("customerId");
  const { productName } = request.body;
  
  try {
    const data = await invoicesModel.find({
      products: { $in: productName },
      customerId: userId,
    });
    response.json(data);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "An error occurred while searching for invoices by product names",
    });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  deleteInvoice,
  searchInvoice,
};
