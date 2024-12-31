const mongoose = require("mongoose");

const connectDB = async (url) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log("Failed to connect DB ", err);
    });
};

module.exports = connectDB;
