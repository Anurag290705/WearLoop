const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/revastra");
    console.log("MongoDB Connected Successfully 🚀");
  } catch (error) {
    console.log("MongoDB Connection Failed ❌");
    console.log(error);
  }
};

module.exports = connectDB;
