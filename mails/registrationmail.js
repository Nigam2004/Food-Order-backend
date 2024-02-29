const mailTransporter = require("../services/mailTransporter");
const ejs = require("ejs");
const path = require("path");
const registrationmail = async (userGmail) => {
  const template = path.join(__dirname, "../view/registerSuccess.ejs");
  const data = await ejs.renderFile(template, { userGmail });
  var mailOption = {
    from: '"Nigam Bisoyi"babubisoyi307@gmail.com',
    to: userGmail,
    subject: "Registration Succesfull",
    // text: "good",
    html: data,
  };
  await mailTransporter.sendMail(mailOption, function (error, info) {
    error && console.log("error in registrationmail:", error);
  });
  return true;
};

module.exports = registrationmail;
