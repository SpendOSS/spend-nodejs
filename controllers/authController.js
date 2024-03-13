const { db } = require("../database/admin");
const { sendMail } = require("../helper/mail");
const { generateOTP } = require("../helper/otpGenerator");

const usersRef = db.collection("users");

exports.signin = async (req, res) => {
  let { email } = req.body;
  try {
    usersRef
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return res.status(200).json({
            isUserAvailable: false,
            isOtpSent: false,
            message: "Email is not registered",
          });
        } else {
          let otp = generateOTP;
          sendMail(email, otp, "Sigin");
          usersRef.doc(snapshot.docs[0].id).update({ otp });
          res.status(200).json({
            isUserAvailable: true,
            isOtpSent: true,
            message: "OTP Sent to registered mail Id",
          });
        }
      });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, please try again",
      error: error,
    });
  }
};

exports.signup = (req, res) => {
  let { email, mobileNumber } = req.body;
  try {
    usersRef
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          let otp = generateOTP;
          const userJson = {
            email: email,
            mobileNumber: mobileNumber,
            otp,
            isUserVerified: false,
          };
          sendMail(email, otp, "Registration with Spend.");
          usersRef
            .doc()
            .set(userJson)
            .then(() => {
              return res.status(200).json({
                isUserAvailable: false,
                isOtpSent: true,
                message: "OTP Sent to mail Id",
              });
            });
        } else {
          let data = snapshot.docs[0].data();
          if (!data.isUserVerified) {
            return res.status(200).json({
              isUserAvailable: true,
              isUserVerified: false,
              isOtpSent: false,
              message: "User is Not Verified",
            });
          }
          return res.status(200).json({
            isUserAvailable: true,
            isOtpSent: false,
            isUserVerified: false,
            message: "User is already registered",
          });
        }
      });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

exports.resendOTP = async (req, res) => {
  let { email } = req.body;
  try {
    usersRef
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        let otp = generateOTP;
        sendMail(email, otp, "Login/Signup");
        usersRef.doc(snapshot.docs[0].id).update({ otp });
        return res.status(200).json({
          isOtpSent: true,
          message: "OTP Sent to mail Id",
        });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    usersRef
      .where("email", "==", req.body.email)
      .get()
      .then((snapshot) => {
        let user = snapshot.docs[0].data();
        if (user.otp === req.body.otp) {
          return res.status(200).json({
            isOtpValid: true,
            message: "otp verified successfully",
          });
        } else {
          return res.status(200).json({
            isOtpValid: false,
            message: "otp is invalid",
          });
        }
      });
  } catch (error) {
    res.send(error);
  }
};
