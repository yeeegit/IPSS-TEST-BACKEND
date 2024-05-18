const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB access success");
    })
    .catch((err) => {
      console.log("error:", err);
    });
};

module.exports = connectDatabase;
