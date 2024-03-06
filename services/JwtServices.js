const jwt = require("jsonwebtoken");

class jwtServices {
  static sign(payload, expiry = "2h", secret = process.env.JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = process.env.JWT_SECRET) {
    return jwt.verify(token, secret);
  }
}

module.exports = jwtServices;
