require('dotenv').config(); 
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
    subject: "SPEND OTP to Login",
    text: `OTP is ${otp}`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports ={sendMail}
