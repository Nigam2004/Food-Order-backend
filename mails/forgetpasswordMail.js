const mailTransporter = require("../services/mailTransporter");
const ejs = require("ejs");
const path = require("path");
const forgetpasswordMail = async (userGmail, forgetPasswordUrl) => {
  const template = path.join(__dirname, "../view/resetpassword.ejs");
  const data = await ejs.renderFile(template, { forgetPasswordUrl });
  // console.log(forgetPasswordUrl);
  var mailOption = {
    from: '"Nigam Bisoyi"babubisoyi307@gmail.com',
    to: userGmail,
    subject: "Forget-password-Mail",
    text: forgetPasswordUrl,
    html: data,
  };
  await mailTransporter.sendMail(mailOption, function (error, info) {
    error && console.log("error in registrationmail:", error);
  });
  return true;
};

module.exports = forgetpasswordMail;
