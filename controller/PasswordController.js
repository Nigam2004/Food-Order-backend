const user = require("../model/user");
const CustomErrorHandle = require("../services/customErrorHandler");
const jwtServices = require("../services/JwtServices");
const mailService = require("../services/mailService");
exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    const userData = await user.findOne({ email });
    // console.log(userData);
    if (!userData) {
      return next(CustomErrorHandle.notExist("Entered email is not regster"));
    }

    let token = jwtServices.sign({
      _id: userData._id,
      email: userData.email,
    });

    const forgetPasswordUrl = `http://localhost:4000/user/${userData._id}/${token}`;
    let isMailed = mailService(
      userData.email,
      "forget-password-URL",
      forgetPasswordUrl
    );
    if (isMailed) {
      res.send({
        success: true,
        message: "Forget Password link has been sent to your registered email.",
      });
    }
  } catch (error) {
    return next(error);
  }
};
