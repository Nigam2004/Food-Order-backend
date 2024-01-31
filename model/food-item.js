const mongoose = require("mongoose");

const foodItem = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      require: true,
    },
    food_name: {
      type: String,
      require: true,
    },
    review: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    food_type: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("food-item", foodItem);
