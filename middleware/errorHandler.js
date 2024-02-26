const { ValidationError } = require("joi");
const CustomErrorHandle = require("../services/customErrorHandler");
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: err,
  };
  if (err instanceof CustomErrorHandle) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }
  return res.status(statusCode).send(data);
};

module.exports = errorHandler;
