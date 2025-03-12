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
    const { fullName, phone, address, email, password, confirmPassword } = request.body;
    
     // Validate phone number
     const phoneRegex = /^[0-9]{10}$/;
     if (!phoneRegex.test(phone)) {
       return response.status(400).json({ message: "Phone number must be exactly 10 digits." });
     }
 
      // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return response.status(400).json({
        message: "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.",
      });
    }
 
     if (password !== confirmPassword) {
       return response.status(400).json({ message: "Passwords do not match." });
     }
    
    const hashedPassowrd = await bcrypt.hash(password, 10);
    const data = await usersModel.create({
      fullName,
      phone,
      address,
      email,
      password: hashedPassowrd,
    });
    response.status(201).json(data);
  } catch (err) {
    response.status(500).json({ error: err, message: "Sign up failed" });
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
