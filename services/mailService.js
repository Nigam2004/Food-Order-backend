const nodemailer = require("nodemailer");
const mailService = (userGmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "babubisoyi307@gmail.com",
      pass: "amkmnjonelrcswee",
    },
  });

  var mailOption = {
    from: "babubisoyi307@gmail.com",
    to: userGmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOption, function (error, info) {
    // console.log(mailOption);
    error ? console.log(error) : console.log("succsss");
    // console.log(info);
  });
  return true;
};

module.exports = mailService;
