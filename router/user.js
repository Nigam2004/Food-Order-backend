const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const passwordController = require("../controller/PasswordController");
const auth = require("../middleware/auth");
const ejs = require("ejs");
const path = require("path");
router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.get("/mydata", auth, UserController.myData);
router.post("/forget-password", passwordController.forgetPassword);
router.post("/reset-password", auth, passwordController.resetPassword);
module.exports = router;

// router.get("/:_id/:token", async (req, res) => {
//   const template = path.join(__dirname, "../view/passwordChangepage.ejs");
//   const data = await ejs.renderFile(template);
//   res.send(data);
// });
