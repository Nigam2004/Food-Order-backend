const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const passwordController = require("../controller/PasswordController");
router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.post("/forget-password", passwordController.forgetPassword);
module.exports = router;
