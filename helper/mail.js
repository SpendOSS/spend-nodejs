require("dotenv").config();
var nodemailer = require("nodemailer");
const { generateOTP } = require("./otpGenerator");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = (toMail, otp) => {
  let mailOptions = {
    from: process.env.MAIL_ID,
    to: toMail,
    subject: "SPEND OTP to Login/SignUp",
    html: `<html> <h1>Hi,</h1> <br/><p style="color:grey; font-size:1.2em">Please use the below OTP code to complete your account setup on Spend</p><br><br><h1 style="color:#2A880A">${otp}</h1></html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendMail };
