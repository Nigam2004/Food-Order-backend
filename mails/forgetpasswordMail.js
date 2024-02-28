const mailTransporter = require("../services/mailTransporter");
const forgetpasswordMail = (userGmail, forgetPasswordUrl) => {
  //   console.log(forgetPasswordUrl);
  var mailOption = {
    from: '"Nigam Bisoyi"babubisoyi307@gmail.com',
    to: userGmail,
    subject: "Forget-password-Mail",
    text: forgetPasswordUrl,
  };
  mailTransporter.sendMail(mailOption, function (error, info) {
    error && console.log("error in registrationmail:", error);
  });
  return true;
};

module.exports = forgetpasswordMail;
