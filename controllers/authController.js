const { db } = require("../database/admin");
const { sendMail } = require("../helper/mail");
const { generateOTP } = require("../helper/otpGenerator");
const { encryptPWD } = require("../helper/passwordCheck");

const usersRef = db.collection("users");

exports.signin = async (req, res) => {
  let { email } = req.body.email;
  try {
    usersRef
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return res.send("User not exists");
        } else {
          let otp = generateOTP;
          sendMail(email, otp);
          usersRef.doc(snapshot.docs[0].id).update({ otp });
          res.send("otp send successfully");
        }
      });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

exports.signup = async (req, res) => {
  try {
    usersRef
      .where("email", "==", req.body.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          let otp = generateOTP;
          const userJson = {
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            otp,
          };
          sendMail(req.body.email, otp);
          usersRef
            .doc()
            .set(userJson)
            .then(() => {
              return res.send("Otp sent successfully");
            });
        } else {
          return res.send("User already exists");
        }
      });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    sendMail("dvsjmr9@gmail.com");
    res.send("otp sent successfully");
  } catch (error) {
    res.send(error);
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
          return res.send("otp verified successfully");
        } else {
          return res.send("otp is wrong");
        }
      });
  } catch (error) {
    res.send(error);
  }
};

exports.createUser = (req, res) =>{
  try{
    usersRef
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return res.send("User not exists");
        } else {
          let otp = generateOTP;
          sendMail(email, otp);
          usersRef.doc(snapshot.docs[0].id).update({ otp });
          res.send("otp send successfully");
        }
      });
  } catch(error){
    return res.send(error)
  }
}