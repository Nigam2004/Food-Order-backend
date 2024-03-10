const jwtServices = require("../services/JwtServices");
const CustomErrorHandler = require("../services/customErrorHandler");

const auth = async (req, res, next) => {
  const bareerToken = req.headers.authorization;
  // console.log(bareerToken);
  if (!bareerToken) {
    return next(CustomErrorHandler.unAuthorized("Unauthorized"));
  }
  let token = bareerToken.split(" ")[1];
  // console.log(token);
  try {
    const { _id, email } = jwtServices.verify(token);
    const profileData = { _id, email };
    // console.log(profileData);
    req.user = profileData;
    next();
  } catch (error) {
    // console.log(error);
    return next(CustomErrorHandler.unAuthorized("Unauthorized"));
  }
};
module.exports = auth;
