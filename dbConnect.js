const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    const dbconnect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/food-Order"
    );
    console.log("db Connected ...");
  } catch (error) {
    console.log("error in db connection:" + error);
  }
};

module.exports = dbConection;
