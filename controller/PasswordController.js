const user = require("../model/user");
const CustomErrorHandle = require("../services/customErrorHandler");
const jwtServices = require("../services/JwtServices");
const forgetpasswordMail = require("../mails/forgetpasswordMail");
const joi = require("joi");
const bcrypt = require("bcrypt");
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
      password: userData.password,
      email: userData.email,
    });

    const forgetPasswordUrl = `http://localhost:5173/${token}`;
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

exports.resetPassword = async (req, res, next) => {
  const { email, password } = req.user;
  // console.log(password, email);

  const passwordShema = joi.object({
    newPassword: joi.string().pattern(new RegExp("(?=.*[a-z])")).required(),
    confirmPassword: joi.ref("newPassword"),
  });
  let { error } = passwordShema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { newPassword, confirmPassword } = req.body;
  let newHashedPassword = await bcrypt.hash(newPassword, 10);
  let confirmHashedPassword = await bcrypt.hash(confirmPassword, 10);
  try {
    const userData = await user.updateOne(
      { password: password },
      {
        $set: {
          password: newHashedPassword,
          confirmPassword: confirmHashedPassword,
        },
      }
    );
    if (userData.modifiedCount === 0) {
      res.status(404).send({ message: "This link already used once !" });
    } else {
      res.send({ message: "Password Reset success !" });
      // console.log(userData);
    }
  } catch (error) {
    console.log(error, "error from reset");
  }
};
