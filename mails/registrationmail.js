const mailTransporter = require("../services/mailTransporter");

const registrationmail = (userGmail) => {
  var mailOption = {
    from: '"Nigam Bisoyi"babubisoyi307@gmail.com',
    to: userGmail,
    subject: "Registration Succesfull",
    text: "good",
    html: "<h1>Succesfull</h1>",
  };
  mailTransporter.sendMail(mailOption, function (error, info) {
    error && console.log("error in registrationmail:", error);
  });
  return true;
};

module.exports = registrationmail;
