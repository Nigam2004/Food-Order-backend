const express = require("express");
require("dotenv").config();
const food_item = require("./router/food-item");
const upload = require("./middleware/multer");
const app = express();
const foodItem = require("./model/food-item");
app.use(express.json());
const dbConection = require("./dbConnect");
dbConection();
// app.post("/home", async (req, res) => {
//     const data = req.body;
//     const result = await foodItem.insertMany(data);
//     console.log(result);
//     res.send({ item: result });
//   });
app.use("/food-order", upload, food_item);

app.listen(5000, () => {
  console.log("app listening on port 5000");
});
