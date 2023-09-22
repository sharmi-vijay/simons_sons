const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  fullName: { type: String },
  phone: {type: String},
  address: {type: String},
  email: { type: String, unique: [true, "Already exist"] },
  password: { type: String },
});

module.exports = mongoose.model("users", usersSchema);
