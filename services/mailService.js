const nodemailer = require("nodemailer");
const mailService = (userGmail, message) => {
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
    subject: "Registartion on food-order-application",
    text: message,
  };

  transporter.sendMail(mailOption, function (error, info) {
    // console.log(mailOption);
    error ? console.log(error) : console.log("succsss");
    // console.log(info);
  });
};

module.exports = mailService;
