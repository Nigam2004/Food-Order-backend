const express = require("express");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
require("./services/mailTransporter");
const food_item = require("./router/food-item");
const user = require("./router/user");
const upload = require("./middleware/multer");
const app = express();
const foodItem = require("./model/food-item");
app.use(express.json());
const dbConection = require("./dbConnect");
dbConection();

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // use your actual domain name (or localhost), using * is not recommended
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);

app.use("/user", user);
app.use("/food-order", upload, food_item);
app.use(errorHandler);
app.listen(4000, () => {
  console.log("app listening on port 4000");
});

// app.post("/home", async (req, res) => {
//     const data = req.body;
//     const result = await foodItem.insertMany(data);
//     console.log(result);
//     res.send({ item: result });
//   });
