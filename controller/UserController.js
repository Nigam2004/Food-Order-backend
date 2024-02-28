const user = require("../model/user");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwtServices = require("../services/JwtServices");
const CustomErrorHandle = require("../services/customErrorHandler");
const registrationmail = require("../mails/registrationmail");
exports.userRegister = async (req, res, next) => {
  const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("(?=.*[a-z])")).required(),
    confirmPassword: joi.ref("password"),
  });
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { email, password, confirmPassword } = req.body;

  const result = await user.findOne({ email });
  if (result) {
    return next(CustomErrorHandle.alreadyExist("User already exist"));
  }

  // hashes.............
  const hashedPassword = await bcrypt.hash(password, 10);
  const C_hashedPassword = await bcrypt.hash(confirmPassword, 10);
  newUser = new user({
    email,
    password: hashedPassword,
    confirmPassword: C_hashedPassword,
  });
  let newResult = await newUser.save();
  const isMailed = registrationmail(newResult.email);
  if (isMailed) res.send({ success: true, data: newResult });
};

exports.userLogin = async (req, res, next) => {
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("(?=.*[a-z])")).required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { email, password } = req.body;
  // console.log(password);
  let token;
  try {
    const User = await user.findOne({ email });
    if (!User) {
      return next("User Does not exist");
    }
    const match = await bcrypt.compare(password, User.password);
    // console.log(match);
    if (!match) {
      return next("Password Does not match");
    }

    token = jwtServices.sign({ _id: User._id, email: User.email });
    // console.log(token);
    res.send({ result: "success", token: `Bearer ${token}` });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
