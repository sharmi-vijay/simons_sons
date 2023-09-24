require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const jwtAuthChecker = require('./middleware/jwtAuthChecker')

const app = express();

const PORT = process.env.PORT;
connectDB();

app.use(express.json({limit: "60mb"}));
app.use(cors());
app.use(express.urlencoded({limit: "60mb", extended: false }));

app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/products', jwtAuthChecker, require('./routes/productsRoutes'))
app.use('/api/invoices', jwtAuthChecker, require('./routes/invoicesRoutes'))

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
