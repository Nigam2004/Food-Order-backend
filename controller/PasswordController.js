const user = require("../model/user");
const CustomErrorHandle = require("../services/customErrorHandler");
const jwtServices = require("../services/JwtServices");
const forgetpasswordMail = require("../mails/forgetpasswordMail");
exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);
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
    // console.log(forgetPasswordUrl);
    let isMailed = forgetpasswordMail(userData.email, forgetPasswordUrl);
    if (isMailed) {
      res.send({
        result: true,
        message: "Forget Password link has been sent to your registered email.",
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.resetPassword = (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  console.log(req);
  res.send("success");
};
