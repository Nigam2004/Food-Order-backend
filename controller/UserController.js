const user = require("../model/user");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwtServices = require("../services/JwtServices");
const CustomErrorHandle = require("../services/customErrorHandler");
const registrationmail = require("../mails/registrationmail");

exports.userRegister = async (req, res, next) => {
  const registerSchema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("(?=.*[a-z])")).required(),
    confirmPassword: joi.ref("password"),
  });
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const result = await user.findOne({ email });
  if (result) {
    return next(CustomErrorHandle.alreadyExist("User already exist"));
  }

  // hashes.............
  const hashedPassword = await bcrypt.hash(password, 10);
  const C_hashedPassword = await bcrypt.hash(confirmPassword, 10);
  newUser = new user({
    lastName,
    firstName,
    email,
    password: hashedPassword,
    confirmPassword: C_hashedPassword,
  });
  let newResult = await newUser.save();
  const isMailed = registrationmail(newResult.email);
  if (isMailed) res.send({ result: true, message: "success", data: newResult });
};

// ...........Login...........
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
    res.send({ login: true, message: "success", token: `Bearer ${token}` });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.myData = async (req, res, next) => {
  const userId = req.user._id;
  try {
    let userData = await user
      .findOne({ _id: userId })
      .select("-password -confirmPassword -updatedAt -__v");

    res.send({ data: userData });
  } catch (error) {
    console.log(error);
  }
};
