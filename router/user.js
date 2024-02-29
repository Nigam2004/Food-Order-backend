const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const passwordController = require("../controller/PasswordController");
const auth = require("../middleware/auth");
router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.get("/mydata", auth, UserController.myData);
router.post("/forget-password", passwordController.forgetPassword);
router.get("/:_id/:token", (req, res) => {
  res.send("<h1>hii</h>");
});
module.exports = router;
