const { db } = require("../database/admin");
const { sendMail } = require("../helper/mail");
const { encryptPWD } = require("../helper/passwordCheck");

exports.signin = async (req, res) => {
  const usersRef = db.collection("users");
  try {
    usersRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      return res.status(201).json(data);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

exports.signup = async (req, res) => {
  try {
    const userJson = {
      email: req.body.email,
      password: encryptPWD(req.body.password),
    };
    const usersDb = db.collection("users");
    const response = await usersDb.doc().set(userJson);
    res.send(response);
  } catch (error) {
    res.send(error);
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
