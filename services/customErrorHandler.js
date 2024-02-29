class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }
  static notExist(message) {
    return new CustomErrorHandler(409, message);
  }
  static unAuthorized(message) {
    return new CustomErrorHandler(404, message);
  }
}

module.exports = CustomErrorHandler;
