const express = require("express");
const router = express.Router();
const foodItemControll = require("../controller/foodItemController");
router.post("/add-item", foodItemControll.addItem);

module.exports = router;
