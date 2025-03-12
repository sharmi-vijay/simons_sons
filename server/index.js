require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const jwtAuthChecker = require('./middleware/jwtAuthChecker')
const nodemailer = require("nodemailer");
const twilio = require("twilio");

const app = express();

const PORT = process.env.PORT;
connectDB();

app.use(express.json({limit: "60mb"}));
app.use(cors());

app.use(express.urlencoded({ limit: "60mb", extended: false }));

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/send-confirmation", async (req, res) => {
  const { email, phone, paymentId } = req.body;

  try {
    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Payment Confirmation",
      text: `Your payment was successful! Payment ID: ${paymentId}`
    });

    // Send SMS
    await client.messages.create({
      body: `Your payment was successful! Payment ID: ${paymentId}`,
      from: process.env.TWILIO_PHONE,
      to: phone
    });

    res.json({ message: "Confirmation sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//updated
app.use('/api/users', require('./routes/usersRoutes'));


app.use('/api/products', jwtAuthChecker, require('./routes/productsRoutes'))
app.use('/api/invoices', jwtAuthChecker, require('./routes/invoicesRoutes'))
app.use('/api/contact', require('./routes/contactRoutes'))
// app.use('/api/wishlist', require('./routes/wishlistRoutes'))


app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
