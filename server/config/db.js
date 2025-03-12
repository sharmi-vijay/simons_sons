const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Database connected successfully! ${conn.connection.host}/${conn.connection.name}`
    );
  } catch(err) {
    console.log("Database connection failed!", err);
    process.exit(1);
  }
};

//updated for storing user data from db

// const User = mongoose.model('users', {fullName: String, phone:String, address: String, email: String})
// router.get('/', async(req, res) =>{
//   try{
//     const users = await User.find();
//     res.json(users);
//   }catch(err){
//     res.status(500).json({message: err.message});
//   }
// });


module.exports = connectDB;



