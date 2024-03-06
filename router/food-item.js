const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const foodItemControll = require("../controller/foodItemController");
router.post("/add-item", foodItemControll.addItem);
router.get("/find-item/:item", foodItemControll.findItem);
router.get("/find-all-item", foodItemControll.findAllItem);
module.exports = router;
