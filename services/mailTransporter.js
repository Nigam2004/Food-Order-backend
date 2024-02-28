const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "babubisoyi307@gmail.com",
    pass: "amkmnjonelrcswee",
  },
});

// var mailOption = {
//   from: "babubisoyi307@gmail.com",
//   to: userGmail,
//   subject: subject,
//   text: message,
// };

mailTransporter.verify((error, success) => {
  error
    ? console.log("Error In mail service:", error)
    : console.log("Mail server Running ....");
});

// transporter.sendMail(mailOption, function (error, info) {
//   // console.log(mailOption);
//   error ? console.log(error) : console.log("succsss");
//   // console.log(info);
// });
// return true;

module.exports = mailTransporter;
