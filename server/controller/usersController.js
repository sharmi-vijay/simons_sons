const usersModel = require("../model/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

// GENERATE TOKEN
const generateToken = (id) => {
  const token = jwt.sign({ id }, secretKey, { expiresIn: "8h" });
  return token;
};

// SIGN UP
const signUp = async (request, response) => {
  try {
    const { password } = request.body;
    const hashedPassowrd = await bcrypt.hash(password, 2);
    const data = await usersModel.create({
      ...request.body,
      password: hashedPassowrd,
    });
    response.send(data);
  } catch (err) {
    response.json({ error: err, message: "Sign up failed" });
  }
};

// LOGIN
const logIn = async (request, response) => {
  const { email, password } = request.body;

  if (!email) {
    response.status(401);
    throw new Error("Email cannot be empty");
  } else {
    if (!password) {
      response.status(401);
      throw new Error("Password cannot be empty");
    }
  }

  // Find user
  const user = await usersModel.findOne({ email });

  // Authenticate user
  if (user && (await bcrypt.compare(password, user.password))) {
    response.status(200).json({
      id: user._id,
      fullName: user.fullName,
      phone: user.phone,
      address: user.address,
      email: user.email,
      success: true,
      token: generateToken(user._id),
      message: "Logged in successfully!",
    });
  } else {
    response.send("Invalid credentials");
  }
};

module.exports = { signUp, logIn };
