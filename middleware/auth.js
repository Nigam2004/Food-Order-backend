const jwtServices = require("../services/JwtServices");
const CustomErrorHandler = require("../services/customErrorHandler");

const auth = async (req, res, next) => {
  const bareerToken = req.headers.authorization;
  //   console.log(bareerToken);
  if (!bareerToken) {
    return next(CustomErrorHandler.unAuthorized("Unauthorized"));
  }
  const token = bareerToken.split(" ")[1];
  //   console.log(token);
  try {
    const { _id, email } = await jwtServices.verify(token);
    const user = { _id, email };
    // console.log(user);
    req.user = user;
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized("Unauthorized"));
  }
};
module.exports = auth;
