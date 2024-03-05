const otpGenerator = require("otp-generator");

exports.generateOTP = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  specialChars: false,
  lowerCaseAlphabets: false,
  digits: true,
});
